/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


export class BaseEntity {
    @Column({type: 'char', length:128})
    createdBy: string

    @CreateDateColumn({type: 'timestamptz'})
    createAt: Date

    @Column({type: 'char', length:128, nullable: true})
    updatedBy: string

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date

    @Column({type: 'char', length:128, nullable:true})
    deletedBy: string

    @DeleteDateColumn({type: 'timestamptz'})
    deletedAt: Date

}

