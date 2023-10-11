import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    try {
      // check if the user exists
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException('User not found');
      // verify password and return jwt token
      const matchPassword = await argon.verify(user.hash, dto.password);
      if (!matchPassword) throw new ForbiddenException('Credentials Incorrect');
      delete user.hash;
      const token = await this.signToken(user.id, user.email);
      return { message: 'Logged in successfully', user, token };
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: AuthDto) {
    const { email, firstName, lastName } = dto;
    try {
      // check if email already exists
      // generate password
      const hash = await argon.hash(dto.password);
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
      return { message: 'User signed up successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }

  // async validateUser(dto: AuthDto) {
  //   const user = await this.users.findUser(dto.email);
  //   console.log('user', user);

  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
