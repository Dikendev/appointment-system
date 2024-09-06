import { Injectable } from '@nestjs/common';
import { IProcedureRepository } from '../../repositories/procedure/procedure-repository.interface';
import { Procedure } from '../../entities/models';
import { ProcedureDto } from '../../entities/dtos';

@Injectable()
export class ProcedureUseCase {
  constructor(private readonly procedureRepository: IProcedureRepository) {}

  async findById(id: number): Promise<Procedure> {
    return this.procedureRepository.findById(id);
  }

  async findAll(): Promise<Procedure[]> {
    return this.procedureRepository.findAll();
  }

  async create(procedureDto: ProcedureDto): Promise<Procedure> {
    return this.procedureRepository.create(procedureDto);
  }

  async deleteById(id: number): Promise<Procedure> {
    return this.procedureRepository.deleteById(id);
  }
}
