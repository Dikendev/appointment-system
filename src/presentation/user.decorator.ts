import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserLogged = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
