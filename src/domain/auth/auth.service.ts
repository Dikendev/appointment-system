import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto, UserDto } from '../entities/dtos/user.dto';
import { User } from '../entities/models';
import { IUserRepository } from '../repositories/user/user-repository.interface';

export interface Logout {
  message: string;
}

export interface AuthResponse {
  user: User;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(request: Request, response: Response): Promise<string> {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload: unknown;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_JWT_SECRET'),
      });

      console.log('Payload', payload);

      const user = await this.userRepository.findByEmail(payload['email']);

      if (!user) throw new UnauthorizedException('User not found');

      const expiredIn = new Date().getDate() + 7;
      const expiration = Math.floor(expiredIn / 1000);

      if (payload instanceof Object) {
        const accessToken = this.jwtService.sign(
          { ...payload, exp: expiration },
          { secret: this.configService.get('ACCESS_JWT_SECRET') },
        );

        response.cookie('access_token', accessToken, { httpOnly: true });

        return accessToken;
      }
      throw new UnauthorizedException('Invalid payload');
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async issueToken(
    userResponse: User,
    response: Response,
  ): Promise<AuthResponse> {
    const payload = { email: userResponse.profile.email, sub: userResponse.id };

    const token = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get('ACCESS_JWT_SECRET'),
        expiresIn: '2d',
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_JWT_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', token, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });

    return {
      user: userResponse,
    };
  }

  async validateUser(body: LoginDto) {
    const user = await this.userRepository.findByEmail(body.email);

    if (!user) throw new Error('User not found');

    const hashedPassword = user.password;
    const isValidPassword = await this.comparePasswords(
      hashedPassword,
      body.password,
    );

    if (!isValidPassword) throw new Error('Invalid password');
    return user;
  }

  async comparePasswords(
    hashedPassword: string,
    provided: string,
  ): Promise<boolean> {
    return bcrypt.compare(provided, hashedPassword);
  }

  async register(body: UserDto, response: Response): Promise<AuthResponse> {
    console.log('Registering user', body);

    const existingUser = await this.userRepository.findByEmail(
      body.profile.email,
    );

    if (existingUser) throw new Error('User already exists');

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await this.userRepository.create({
      ...body,
      password: hashedPassword,
    });

    console.log('User created', user);
    return this.issueToken(user, response);
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);

    if (!user) throw new Error('Invalid credentials');
    return this.issueToken(user, response);
  }

  async logout(response: Response): Promise<Logout> {
    this.clearCookies(['access_token', 'refresh_token'], response);
    return { message: 'Logged out' };
  }

  async clearCookies(
    tokenStrings: string[],
    response: Response,
  ): Promise<void> {
    tokenStrings.forEach((token) => {
      response.clearCookie(token);
    });
  }

  async registerUser(
    registerDto: RegisterDto,
    response: Response,
  ): Promise<User> {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password must be the same',
      });
    }

    const { user } = await this.register(registerDto, response);
    console.log('REGISTERING A USER', user);

    return user;
  }
}
