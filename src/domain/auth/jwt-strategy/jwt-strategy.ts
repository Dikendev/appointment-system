import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IUserRepository } from '../../repositories/user/user-repository.interface';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.access_token;
        },
      ]),
      secretOrKey: configService.getOrThrow('ACCESS_JWT_SECRET'),
    });
  }

  async validate(payload: Payload) {
    return this.userRepository.findByEmailNoCredential(payload.email);
  }
}
