import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from '../auth/current-user.decorator';
import { AwsService } from 'src/config/aws.config';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class PostsService {
    
   
    constructor(
        @InjectRepository(PostEntity) private repository:Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(CommentEntity) private commentRepository:Repository<CommentEntity>,
        private readonly awsService: AwsService,
    ) {}


    async createPost(createDto: CreatePostDto,file: Express.Multer.File, @CurrentUser() mainUser:any) {
       
        try {
            const uploadResult = await this.awsService.uploadToS3(file);
            console.log('uploadResult', uploadResult)
            const user = await this.userRepository.findOne({where: {id: mainUser.id}})
            const post = this.repository.create();
            post.user = user;
            post.mediaUrl = uploadResult.Location;
            post.createdBy = mainUser.id;
            Object.assign(post, createDto)
            return this.repository.save(post)
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status)
        }
    }

    async postList(page: number, take: number) {
        try {
            const skip = (page - 1) * take;

            return this.repository.find({
                relations:['user', 'comments'],
                skip,
                take: take,
                order: {createAt: 'DESC'}
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status)
        }
    }

    async createComment(createDto: CreateCommentDto, mainUser: any) {
        try {
            const user = await this.userRepository.findOne({where: {id: mainUser.id}})
            const post = await this.repository.findOne({where: {id: createDto.post_id}});
            const comment =  this.commentRepository.create()
            Object.assign(comment, createDto);

            comment.createdBy = mainUser.id;
            comment.user = user;
            comment.post = post
            return this.commentRepository.save(comment)
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status)
        }
    }
}
