import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  authorId: string;
}
