import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService: PostsService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() createDto: CreatePostDto, @CurrentUser() mainUser:any) {
        return this.postService.createPost(createDto,file, mainUser)
    }

    @Get()
    async postList(@Query('page') page: number=1, @Query('take') take: number=10) {
        return this.postService.postList(page, take)
    }

    @Post('comment')
    async createComment( @Body() createDto: CreateCommentDto, @CurrentUser() mainUser:any) {
        return this.postService.createComment(createDto, mainUser)
    }
}
