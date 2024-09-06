import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JWT_STRATEGY } from './jwt-strategy/constants';
import { RepositoryModule } from '../repositories/repository.module';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: JWT_STRATEGY.secret,
      global: true,
    }),
  ],
  providers: [AuthService, ConfigService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
