import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getUserDetails(@Req() req: Request) {
    return req.user;
  }
}
