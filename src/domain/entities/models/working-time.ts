export class WorkingTime {
  static count: number = 0;

  id: string;
  dayTime: Date;
  start: Date;
  end: Date;
  userId: number;

  constructor(workingTime: Partial<WorkingTime>) {
    this.id = workingTime.id;
    this.dayTime = workingTime.dayTime;
    this.start = workingTime.start;
    this.end = workingTime.end;
    this.userId = workingTime.userId;

    WorkingTime.count++;
  }
}
