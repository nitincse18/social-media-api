import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Patch('update')
    async updateUser(@Param('id') id:number ,@Body() updateuserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateuserDto)
    }

    @Get('/:id')
    async getUserById(@Param('id') id:number){
        return this.userService.getUserById(id)
    }
}
