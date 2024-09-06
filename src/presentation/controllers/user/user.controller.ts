import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { RegisterDto } from '../../../domain/entities/dtos/user.dto';
import { UserUseCase } from '../../../domain/use-cases/user/user.use-case';
import { User } from '../../../domain/entities/models/user';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    return this.userUseCase.register(registerDto, response);
  }

  @Get()
  async list(): Promise<User[]> {
    return this.userUseCase.users();
  }

  @Post()
  async createUser(
    @Body() registerDto: RegisterDto,
    @Res() response: Response,
  ): Promise<User> {
    return this.userUseCase.register(registerDto, response);
  }

  @Delete('wipe')
  async wipe() {
    return this.userUseCase.wipe();
  }
}
