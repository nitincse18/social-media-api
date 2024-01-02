import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from "./db/ormconfig";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterMiddleware } from './middleware/multer.middleware';
import * as multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MulterModule.register({
      storage: multer.memoryStorage(), // Specify the destination directory for uploaded files
    }),
     UserModule, AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MulterMiddleware).forRoutes('upload');
  }
}
