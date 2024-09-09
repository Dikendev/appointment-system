import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../domain/auth/jwt-strategy/jwt-auth.guard';
import { Profile } from '../../../domain/entities/models';
import { Request } from 'express';
import { ProfileUseCase } from '../../../domain/use-cases/profile/profile.use-case';
import { ProfileUpdateDto } from '../../../domain/entities/dtos';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileUseCase: ProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findProfile(@Req() request: Request): Promise<Profile> {
    return this.profileUseCase.me(request);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUserProfile(
    @Req() request: Request,
    @Body() body: ProfileUpdateDto,
  ): Promise<Profile> {
    return this.profileUseCase.updateUser(request, body);
  }
}
