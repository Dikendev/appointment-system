import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from '../../../domain/entities/dtos/user.dto';
import { UserUseCase } from '../../../domain/use-cases/user/user.use-case';
import { User } from '../../../domain/entities/models/user';
import { Request, Response } from 'express';
import {
  JwtAuthGuard,
  Public,
} from '../../../domain/auth/jwt-strategy/jwt-auth.guard';
import { LoginDto } from '../../../domain/auth/dto/login-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.userUseCase.register(registerDto, response);
    response.status(201).send(user);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() response: Response) {
    const user = await this.userUseCase.login(body, response);
    response.status(201).send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    const user = await this.userUseCase.logout(request, response);
    response.status(201).send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(): Promise<User[]> {
    return this.userUseCase.users();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('wipe')
  async wipe() {
    return this.userUseCase.wipe();
  }
}
