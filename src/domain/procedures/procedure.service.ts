import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../external/prisma/prisma.service';
import { ProcedureRepository } from './repository/procedure.repository';
import { CreateProcedureDto, ProcedureResponse } from './model';
import { ProcedureQuery } from './model/procedure-query';

@Injectable()
export class ProcedureService implements ProcedureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async procedure(procedureQuery: ProcedureQuery): Promise<ProcedureResponse> {
    const procedureResponse = await this.prisma.procedure.findUnique({
      where: { id: procedureQuery.id },
    });

    if (!procedureResponse) {
      throw new NotFoundException();
    }

    return new ProcedureResponse(procedureResponse);
  }

  async procedures(): Promise<ProcedureResponse[]> {
    const procedureResponse = await this.prisma.procedure.findMany();

    if (!procedureResponse.length) {
      throw new NotFoundException();
    }

    return procedureResponse.map(
      (procedure) => new ProcedureResponse(procedure),
    );
  }

  async servicesByCriteria(
    procedureQuery: ProcedureQuery,
  ): Promise<ProcedureResponse[]> {
    const procedureResponse = await this.prisma.procedure.findMany({
      where: procedureQuery,
    });

    if (!procedureResponse.length) {
      throw new NotFoundException();
    }

    return procedureResponse.map(
      (procedure) => new ProcedureResponse(procedure),
    );
  }

  async createProcedure(
    createProcedureDto: CreateProcedureDto,
  ): Promise<ProcedureResponse> {
    try {
      const procedureResponse = await this.prisma.procedure.create({
        data: createProcedureDto,
      });
      return new ProcedureResponse(procedureResponse);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteProcedure(
    procedureQuery: ProcedureQuery,
  ): Promise<ProcedureResponse> {
    try {
      return await this.prisma.procedure.delete({
        where: procedureQuery.id
          ? { id: procedureQuery.id }
          : { name: procedureQuery.name },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
