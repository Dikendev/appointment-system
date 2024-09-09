import { ProfileUpdateDto } from '../../entities/dtos';
import { Profile } from '../../entities/models';

export abstract class IProfileRepository {
  abstract me(email: string): Promise<Profile>;
  abstract updateUser(id: string, body: ProfileUpdateDto): Promise<Profile>;
  abstract updateClient(id: string, body: ProfileUpdateDto): Promise<Profile>;
}
