import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import { Messages } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    const { title, authorId, description } = dto;
    try {
      // create post
      const post = await this.prisma.post.create({
        data: {
          title,
          description,
          authorId,
        },
      });
      return { message: Messages.POST_CREATED, post };
    } catch (error) {
      throw error;
    }
  }

  async findById(@Param('id') id: string) {
    try {
      // check if post exists
      const post = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!post) throw new ForbiddenException(Messages.POST_NOT_FOUND);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const posts = await this.prisma.post.findMany();
      if (!posts) throw new ForbiddenException(Messages.POST_NOT_FOUND);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async update(@Param('id') id: string, dto: CreatePostDto) {
    try {
      const { title, authorId, description } = dto;
      // check if post exists
      const checkExistingPost = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!checkExistingPost)
        throw new ForbiddenException(Messages.POST_NOT_FOUND);
      // update post
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
      if (!checkExistingPost)
        throw new ForbiddenException(Messages.POST_NOT_FOUND);
      const deletePost = await this.prisma.post.delete({
        where: {
          id,
        },
      });
      return { post: deletePost.id, message: Messages.POST_DELETED };
    } catch (error) {
      throw error;
    }
  }

  async findPostsByUserId(@Param('id') id: string) {
    try {
      // check if the author's post exists
      const post = await this.prisma.post.findMany({
        where: {
          authorId: id,
        },
      });
      if (!post) throw new ForbiddenException(Messages.POST_NOT_FOUND_AUTHOR);
      return post;
    } catch (error) {
      throw error;
    }
  }
}
