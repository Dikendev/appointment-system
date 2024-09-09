import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../entities/dtos/user.dto';
import { User } from '../entities/models';
import { IUserRepository } from '../repositories/user/user-repository.interface';
import {
  Logger,
  LoggerKey,
} from '../../external/logger/domain/logger.repository';
import { UserFactory } from '../use-cases/user/user-factory.service';
import { hashPassword } from './hash-password';

export interface Logout {
  message: string;
}

export interface AuthResponse {
  user: User;
}

export interface Payload extends JwtSignIn {
  iat: number;
  exp: number;
}

interface JwtSignIn {
  email: string;
  sub: string;
}

const JwtTokenSecret = {
  ACCESS_JWT_SECRET: 'ACCESS_JWT_SECRET',
  REFRESH_JWT_SECRET: 'REFRESH_JWT_SECRET',
} as const;

type JwtTokenSecret = keyof typeof JwtTokenSecret;

@Injectable()
export class AuthService {
  constructor(
    @Inject(LoggerKey) private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(request: Request, response: Response): Promise<User> {
    this.logger.info('Refreshing token');

    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Need to be logged in');
    }

    let payload: Payload;

    try {
      payload = this.jwtService.verify<Payload>(refreshToken, {
        secret: this.configService.get('REFRESH_JWT_SECRET'),
      });

      const payloadEmail = payload.email;
      const user = await this.userRepository.findByEmail(payloadEmail);

      if (!user) throw new UnauthorizedException('User not found');

      const accessToken = this.accessTokenSignIn({
        email: payloadEmail,
        sub: user.id,
      });

      response.cookie('access_token', accessToken, { httpOnly: true });
      return user;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async issueToken(userResponse: User, response: Response): Promise<User> {
    const payload = { email: userResponse.profile.email, sub: userResponse.id };

    const accessToken = this.accessTokenSignIn({
      ...payload,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_JWT_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });

    return userResponse;
  }

  async validateUser(body: LoginDto): Promise<User> {
    const user = await this.userRepository.findByEmail(body.email);

    if (!user) {
      throw new HttpException('Email or Password invalid, try again', 404);
    }

    const hashedPassword = user.password;
    const isValidPassword = await this.comparePasswords(
      hashedPassword,
      body.password,
    );

    if (!isValidPassword) throw new Error('Invalid password');

    return UserFactory.omitPassword(user);
  }

  async register(body: RegisterDto, response: Response): Promise<User> {
    const hashedPassword = await hashPassword(body.password);

    const user = await this.userRepository.create({
      name: body.name,
      profile: { email: body.email },
      password: hashedPassword,
    });

    const token = await this.issueToken(user, response);
    return token;
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

  async registerUser(body: RegisterDto, response: Response): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(body.email);
    if (existingUser) throw new BadRequestException('User already exists');

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    return this.register(body, response);
  }

  async clearCookies(
    tokenStrings: string[],
    response: Response,
  ): Promise<void> {
    tokenStrings.forEach((token) => {
      response.clearCookie(token);
    });
  }

  async comparePasswords(
    hashedPassword: string,
    provided: string,
  ): Promise<boolean> {
    return bcrypt.compare(provided, hashedPassword);
  }

  validateAccessToken(accessToken: string): Payload {
    try {
      const secret = this.configService.get('ACCESS_JWT_SECRET');
      return this.validateToken(accessToken, secret);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  validateRefreshToken(refreshToken: string): Payload {
    try {
      const secret = this.configService.get('REFRESH_JWT_SECRET');
      return this.validateToken(refreshToken, secret);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  validateToken(token: string, secretKey: string): Payload {
    const tokenData = this.jwtService.verify<Payload>(token, {
      secret: secretKey,
    });
    return tokenData;
  }

  accessTokenSignIn(payload: JwtSignIn): string {
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRATION');
    return this.jwtSignIn(payload, 'ACCESS_JWT_SECRET', expiresIn);
  }

  refreshTokenSignIn(payload: JwtSignIn): string {
    const expiresIn = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION',
    );
    return this.jwtSignIn(payload, 'ACCESS_JWT_SECRET', expiresIn);
  }

  private jwtSignIn(
    payload: JwtSignIn,
    jwtTokenSecret: JwtTokenSecret,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>(jwtTokenSecret),
        expiresIn: expiresIn,
      },
    );
  }
}
