import { ForbiddenException, Injectable, Param } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-unused-vars
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

  async create(dto: AuthDto) {
    const { email, firstName, lastName, password } = dto;
    try {
      // check if email already exists
      const checkUserExists = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (checkUserExists) throw new ForbiddenException('User already exists');
      // generate password hash
      const hash = await argon.hash(password);
      // save user
      const user = await this.prisma.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return { message: 'User created successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async findById(@Param('id') id: string) {
    try {
      // check if the user exists
      const user = await this.prisma.user.findUnique({
        where: {
          id,
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
