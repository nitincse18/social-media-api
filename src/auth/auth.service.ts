import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import  bcrypt, { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({where: {email: email}})

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signup(user: SignupDto): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(user);
      newUser.createdBy = user.email
      return await this.userRepository.save(newUser);
    } catch (error) {
        console.log(error)
    }
  }

  async login(loginDto: LoginDto) {
    try {
        const validatedUser = await this.validateUser(loginDto.email, loginDto.password);
        delete validatedUser.password;
        if(validatedUser) {
          const accessToken =await this.jwtService.sign(validatedUser);
          validatedUser.token = accessToken
          return validatedUser;
        }else{
          throw new HttpException('Invalid User Credentials', HttpStatus.BAD_REQUEST);
        }
    
  }catch (error) {
    console.log(error)
    throw new HttpException(error.message, error.status)
  }
  }
}
