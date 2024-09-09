import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/models/user';
import { IUserRepository } from '../../repositories/user/user-repository.interface';
import { RegisterDto } from '../../entities/dtos';
import { AuthService, Logout } from '../../auth/auth.service';
import { Request, Response } from 'express';
import { LoginDto } from '../../auth/dto/login-dto';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';
import { UserFactory } from './user-factory.service';

export type Param = { id: string } | { email: string };

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private readonly authService: AuthService,
    private readonly userRepository: IUserRepository,
  ) {}

  async findUser(params: Param): Promise<User> {
    const param = 'id' in params ? { id: params.id } : { email: params.email };
    return this.userRepository.findById(param.id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findByEmail(email);
  }

  async users(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => UserFactory.omitPassword(user));
  }

  async register(body: RegisterDto, response: Response): Promise<User> {
    const user = await this.authService.registerUser(body, response);
    this.logger.info(`User ${user.profile.email} registered`);
    return user;
  }

  async login(body: LoginDto, response: Response): Promise<User> {
    const user = await this.authService.login(body, response);
    this.logger.info(`User ${user.profile.email} logged in`);
    return user;
  }

  async logout(request: Request, response: Response): Promise<Logout> {
    const user = request.user;
    const msg = await this.authService.logout(response);
    this.logger.info(`User ${user.profile.email} logged out`);
    return msg;
  }

  async deleteUser(id: string): Promise<User> {
    return this.userRepository.deleteById(id);
  }

  async wipe() {
    return this.userRepository.wipe();
  }
}
