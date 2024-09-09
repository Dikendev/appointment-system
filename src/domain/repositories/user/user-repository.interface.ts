import { UserDto } from '../../entities/dtos';
import { User } from '../../entities/models';

export abstract class IUserRepository {
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByEmailNoCredential(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: UserDto): Promise<User>;
  abstract deleteById(id: string): Promise<User>;
  abstract wipe(): Promise<void>;
}
