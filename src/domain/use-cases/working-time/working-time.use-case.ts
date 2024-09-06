import { Injectable } from '@nestjs/common';
import { IWorkingTimeRepository } from '../../repositories/working-time/working-time-repository.interface';
import { WorkingTime } from '../../entities/models';
import { WorkingTimeDto } from '../../entities/dtos';

@Injectable()
export class WorkingTimeUseCase {
  constructor(private readonly workingTimeRepository: IWorkingTimeRepository) {}

  async create(body: WorkingTimeDto): Promise<WorkingTime> {
    return this.workingTimeRepository.create(body);
  }

  async findById(id: number): Promise<WorkingTime> {
    return this.workingTimeRepository.findById(id);
  }

  async findAll(): Promise<WorkingTime[]> {
    return this.workingTimeRepository.findAll();
  }
}
