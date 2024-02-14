import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CacheDTO } from 'src/utils/mappers/user/cacheDTO';
import { CreateUserDTO } from './model/user.model';
import { User, User as UserModel } from '@prisma/client';
import { UserResponseDto } from './model/user.response';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserResponseDto> {
    const user = await this.userService.createUser(createUserDTO);

    return user;
  }

  async getUserCache(@Param('key') key: string): Promise<string> {
    const user = await this.userService.getUserCache(key);
    return user;
  }

  async createUserCache(@Body() cacheDTO: CacheDTO) {
    const { key, value } = cacheDTO;

    return await this.userService.addToCache(key, value);
  }

  @Get(':id/bookings')
  async getUserWithBookings(@Param('id') id: number): Promise<UserResponseDto> {
    return this.userService.findUserWithBookings(id);
  }

  @Get(':id/times')
  async getUserTime(@Param('id') id: number) {
    return this.userService.getUserWorkingTimeByUser({ id });
  }

  @Get('get-all')
  async getAllUser(): Promise<UserResponseDto[]> {
    const users = await this.userService.users({});

    if (!users.length) {
      throw new NotFoundException(`None users found`);
    }

    return users.map((user: User) => new UserResponseDto(user));
  }

  @Get('contains/:searchString')
  async getUser(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
    const users = await this.userService.users({
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
