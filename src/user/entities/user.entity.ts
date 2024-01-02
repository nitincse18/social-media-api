/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { BaseEntity } from 'src/db/entities/base.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/posts/entities/comment.entity';


@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'char', length:128})
    email: string

    @Column({type: 'char', length:56})
    first_name: string

    @Column({type: 'char', length:56})
    last_name: string

    @Column({type: 'bigint'})
    mobile: number

    @Column({ default: '' })
    image: string

    @Column({ select: true })
    password: string

    @Column({type: 'date'})
    dob: Date

    @Column({ enum: ['Male', 'Female', 'Others'] })
    gender: string

    @BeforeInsert()
    async hashedPassword() {
        this.password = await hash(this.password, 10)
    }

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];
    
    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}

