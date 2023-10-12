import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(email) {
    try {
      // check if the user exists
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(@Param('id') id: string, dto: UpdateUserDto) {
    try {
      const checkExistingUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!checkExistingUser) throw new ForbiddenException('User not found');
      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: { ...dto },
      });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(@Param('id') id: string) {
    try {
      const checkExistingUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!checkExistingUser) throw new ForbiddenException('User not found');
      const deleteUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return { user: deleteUser.id, message: 'User deleted' };
    } catch (error) {
      throw error;
    }
  }
}
