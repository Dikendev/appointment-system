import { User } from '../../entities/models/user';

export abstract class UserFactory {
  static omitPassword(body: User): User {
    return new User(
      body.id,
      body.name,
      body.profile,
      body.createdAt,
      body.updatedAt,
      body.workingTimes,
      body.bookings,
    );
  }
}
