import { User } from './user';
import { WorkingTimeDto } from '../dtos/working-time.dto';

export class WorkingTime {
  static count: number = 0;

  id: number;
  dayTime: Date;
  start: Date;
  end: Date;
  userId: number;

  constructor(data: WorkingTimeDto, user: User) {
    this.id = data.id;
    this.dayTime = data.dayTime;
    this.start = data.start;
    this.end = data.end;
    this.userId = user.id;

    WorkingTime.count++;
  }

  static fromDto(data: WorkingTimeDto, user: User): WorkingTime {
    WorkingTime.count++;
    return new WorkingTime(data, user);
  }
}