import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { RepositoryModule } from '../repositories/repository.module';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [RepositoryModule, PassportModule, JwtModule],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
