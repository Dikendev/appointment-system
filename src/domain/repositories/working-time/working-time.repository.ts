import { Injectable } from '@nestjs/common';
import { WorkingTimeDto } from '../../entities/dtos';
import { WorkingTime } from '../../entities/models';
import { IWorkingTimeRepository } from './working-time-repository.interface';

@Injectable()
export class WorkingTimeRepository implements IWorkingTimeRepository {
  create(body: WorkingTimeDto): WorkingTime {
    throw new Error('Method not implemented.');
  }

  findById(id: number): WorkingTime {
    throw new Error('Method not implemented.');
  }

  findAll(): WorkingTime[] {
    throw new Error('Method not implemented.');
  }
}
