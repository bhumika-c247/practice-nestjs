import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  // eslint-disable-next-line no-unused-vars
  constructor(private postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreatePostDto) {
    return this.postService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Get('/user/:id')
  findPostByUserId(@Param('id') id: string) {
    return this.postService.findPostsByUserId(id);
  }
}
