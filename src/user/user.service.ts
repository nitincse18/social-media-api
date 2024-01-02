// src/user/user.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: {email} });
  }

  async updateUser(id: number, updateuserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({where: {id}});
      
      if(!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
      Object.assign(user, updateuserDto)

      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status)
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({where: {id}});
      delete user.password
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status)
    }
  }

}
