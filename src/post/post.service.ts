import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    const { title, authorId, description } = dto;
    try {
      const post = await this.prisma.post.create({
        data: {
          title,
          description,
          authorId,
        },
      });
      return { message: 'Post created successfully', post };
    } catch (error) {
      throw error;
    }
  }

  async findById(@Param('id') id: string) {
    try {
      // check if the post exists
      const post = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async update(@Param('id') id: string, dto: CreatePostDto) {
    try {
      const { title, authorId, description } = dto;
      const checkExistingPost = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!checkExistingPost) throw new ForbiddenException('Post not found');
      const updatePost = await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          authorId,
        },
      });
      return updatePost;
    } catch (error) {
      throw error;
    }
  }

  async delete(@Param('id') id: string) {
    try {
      const checkExistingPost = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!checkExistingPost) throw new ForbiddenException('post not found');
      const deletePost = await this.prisma.post.delete({
        where: {
          id,
        },
      });
      return { post: deletePost.id, message: 'post deleted' };
    } catch (error) {
      throw error;
    }
  }

  async findPostsByUserId(@Param('id') id: string) {
    try {
      // check if the post exists
      const post = await this.prisma.post.findMany({
        where: {
          authorId: id,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
}
