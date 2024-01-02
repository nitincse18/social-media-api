import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsMobilePhone, IsDateString, IsEnum, IsOptional } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({enum: ['text', 'image', 'video']})
  @IsNotEmpty()
  @IsString()
  contentType: string;

  @ApiProperty()
  @IsOptional()
  mediaUrl: string;

}