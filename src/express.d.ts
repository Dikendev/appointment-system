import { User } from './domain/entities/models';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
