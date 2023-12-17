/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { hash } from 'bcrypt';


@Entity({ name: 'users' })
export class UserEntity {
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

    @Column({ select: false })
    password: string

    @Column({type: 'date'})
    dob: Date

    @Column({ enum: ['Male', 'Female', 'Others'] })
    gender: string

    @BeforeInsert()
    async hashedPassword() {
        this.password = await hash(this.password, 10)
    }


}

