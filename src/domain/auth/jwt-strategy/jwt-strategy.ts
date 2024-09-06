import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserUseCase } from '../../use-cases/user/user.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userUseCase: UserUseCase) {
    super({
      jwtFromRequest: (request) => request.cookies['access_token'],
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    console.log('JWT strategy');
    console.log('Payload', payload);
    const user = await this.userUseCase.findUser({ id: payload.sub });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
