import { Injectable } from '@nestjs/common';
import { User } from '../../entities/models/user';
import { IUserRepository } from '../../repositories/user/user-repository.interface';
import { RegisterDto, UserDto } from '../../entities/dtos';
import { AuthService } from '../../auth/auth.service';
import { Response } from 'express';

export type Param = { id: number } | { email: string };

@Injectable()
export class UserUseCase {
  constructor(
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
    console.log('UserUseCase.users');

    const users = await this.userRepository.findAll();
    return users;
  }

  async create(body: UserDto): Promise<User> {
    return this.userRepository.create(body);
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     where,
  //     data,
  //   });
  // }

  async register(body: RegisterDto, response: Response): Promise<User> {
    const userRegistered = await this.authService.register(body, response);
    return userRegistered.user;
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.deleteById(id);
  }

  async wipe() {
    return this.userRepository.wipe();
  }
}
