import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CacheDTO } from 'src/utils/mappers/user/cacheDTO';
import { CreateUserDTO } from './models/user.model';
import { User, User as UserModel } from '@prisma/client';
import { UserResponse } from './models/user.response';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserResponse> {
    const user = await this.usersService.createUser(createUserDTO);

    return user;
  }

  async getUserCache(@Param('key') key: string): Promise<string> {
    const user = await this.usersService.getUserCache(key);
    return user;
  }

  async createUserCache(@Body() cacheDTO: CacheDTO) {
    const { key, value } = cacheDTO;

    return await this.usersService.addToCache(key, value);
  }

  @Get(':id/bookings')
  async getUserWithBookings(@Param('id') id: number): Promise<UserResponse> {
    return this.usersService.findUserWithBookings(id);
  }

  @Get(':id/times')
  async getUserTime(@Param('id') id: number) {
    return this.usersService.getUserWorkingTimeByUser({ id });
  }

  @Get()
  async getAllUser(): Promise<UserResponse[]> {
    const users = await this.usersService.users({});

    if (!users.length) {
      throw new NotFoundException(`None users found`);
    }

    return users.map((user: User) => new UserResponse(user));
  }

  @Get('contains/:searchString')
  async getUser(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
    const users = await this.usersService.users({
      where: {
        OR: [
          { name: { contains: searchString } },
          { email: { contains: searchString } },
        ],
      },
    });

    if (!users.length) {
      throw new NotFoundException(`User ${searchString} not found`);
    }

    return users;
  }
}
