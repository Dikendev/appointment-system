import { Inject, Injectable } from '@nestjs/common';
import { IProcedureRepository } from '../../repositories/procedure/procedure-repository.interface';
import { Procedure } from '../../entities/models';
import { ProcedureDto } from '../../entities/dtos';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';

@Injectable()
export class ProcedureUseCase {
  constructor(
    @Inject(LoggerKey) private readonly logger: Logger,
    private readonly procedureRepository: IProcedureRepository,
  ) {}

  async findById(id: string): Promise<Procedure> {
    return this.procedureRepository.findById(id);
  }

  async findAll(): Promise<Procedure[]> {
    this.logger.info('Fetching all procedures');
    const procedures = await this.procedureRepository.findAll();
    // TODO: handle if not found procedures
    return procedures;
  }

  async create(procedureDto: ProcedureDto): Promise<Procedure> {
    return this.procedureRepository.create(procedureDto);
  }

  async deleteById(id: string): Promise<Procedure> {
    return this.procedureRepository.deleteById(id);
  }
}
