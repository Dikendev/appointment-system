import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProcedureDto } from '../../../domain/entities/dtos';
import { Procedure } from '../../../domain/entities/models';
import { ProcedureUseCase } from '../../../domain/use-cases/procedure/procedure.use-case';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureUseCase: ProcedureUseCase) {}

  @Post()
  async create(@Body() body: ProcedureDto): Promise<Procedure> {
    return this.procedureUseCase.create(body);
  }

  @Get(':id')
  async findById(id: number): Promise<Procedure> {
    return this.procedureUseCase.findById(id);
  }

  @Get()
  async findAll(): Promise<Procedure[]> {
    return this.procedureUseCase.findAll();
  }

  @Delete(':id')
  async delete(@Param() id: number): Promise<Procedure> {
    return this.procedureUseCase.deleteById(id);
  }

  // @Get('criteria/:procedureQuery')
  // async getProcedureByPrice(
  //   @Query() procedureQuery: ProcedureQuery,
  // ): Promise<ProcedureResponse[]> {
  //   return this.procedureRepository.servicesByCriteria(procedureQuery);
  // }
}
