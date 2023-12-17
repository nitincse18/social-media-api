import { Body, Controller, Get, Injectable, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){ }

    @Post('singup')
    async signup(@Body() signUpDto: SignupDto){
        return this.authService.signup(signUpDto)
    }

    
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        console.log(loginDto)
        return this.authService.login(loginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout() {

    }
}
