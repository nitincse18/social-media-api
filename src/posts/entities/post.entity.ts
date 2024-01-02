// src/posts/post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CommentEntity } from './comment.entity';
import { BaseEntity } from 'src/db/entities/base.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({type:'text'})
  title: string

  @Column({ enum: ['text', 'image', 'video'], default: 'text' })
  contentType: string

  @Column({nullable: true})
  mediaUrl: string

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
