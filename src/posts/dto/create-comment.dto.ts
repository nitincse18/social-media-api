import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsMobilePhone, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    post_id: number;

}