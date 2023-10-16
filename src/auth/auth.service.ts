/* eslint-disable no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const { email, password } = dto;
    try {
      // check if the user exists
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) throw new ForbiddenException('User not found');
      // verify password and return jwt token
      const matchPassword = await argon.verify(user.hash, password);
      if (!matchPassword) throw new ForbiddenException('Credentials Incorrect');
      delete user.hash;
      const token = await this.signToken(user.id, user.email);
      return { message: 'Logged in successfully', token };
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: AuthDto) {
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
        },
      });
      return { message: 'User signed up successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret,
    });
  }
}
