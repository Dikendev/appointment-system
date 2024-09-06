import { WorkingTimeDto } from '../../entities/dtos';
import { WorkingTime } from '../../entities/models';

export abstract class IWorkingTimeRepository {
  abstract create(body: WorkingTimeDto): WorkingTime;
  abstract findById(id: number): WorkingTime;
  abstract findAll(): WorkingTime[];
}
