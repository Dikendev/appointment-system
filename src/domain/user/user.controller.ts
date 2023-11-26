import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CacheDTO } from 'src/utils/mappers/user/cacheDTO';
import { UserResponseDTO } from './user.entity';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get(':key')
  @HttpCode(200)
  async getUserCACHE(@Param('key') key: string): Promise<string> {
    console.log('key', key);

    const user = await this.userService.getUserCACHE(key);
    console.log('user', user);
    return user;
  }

  @Post()
  async createUserCACHE(@Body() cacheDTO: CacheDTO) {
    console.log('CacheDTO', cacheDTO);

    const { key, value } = cacheDTO;
    console.log('key', key);
    console.log('value', value);

    return await this.userService.addToCACHE(key, value);
  }

  @Get(':id/bookings')
  async getUserWithBookings(@Param('id') id: number): Promise<UserResponseDTO> {
    return this.userService.findUserWithBookings(id);
  }

  @Get(':id/times')
  async getUserTime(@Param('id') id: number) {
    return this.userService.getUserWorkingTimeByUser({ id });
  }
}
