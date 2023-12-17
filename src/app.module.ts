import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from "./db/ormconfig";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { setupSwagger } from './swagger';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     setupSwagger(this)
//   }
}
