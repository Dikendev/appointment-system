import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const token = this.extractTokenFromCookie(request);

    try {
      this.authService.validateAccessToken(token.access_token);
    } catch (error) {
      if (!token.refresh_token) return false;

      const userRenew = await this.authService.refreshToken(request, response);
      request.user = userRenew;
      return true;
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  private extractTokenFromCookie(request: Request): {
    access_token: string;
    refresh_token: string;
  } {
    return {
      access_token: request.cookies?.access_token,
      refresh_token: request.cookies?.refresh_token,
    };
  }
}
