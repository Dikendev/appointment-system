import { Profile } from '../../entities/models';

export abstract class IProfileRepository {
  abstract findOne(userId: number): Promise<Profile>;
  abstract create(): Promise<Profile>;
}
