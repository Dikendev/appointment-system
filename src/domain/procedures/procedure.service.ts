import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../external/prisma/prisma.service';
import { ProcedureRepository } from './repository/procedure.repository';
import { ProcedureResponse, createProcedureDTO } from './model';

export interface ProcedureQuery {
  id?: number;
  name?: string;
}

@Injectable()
export class ProcedureService implements ProcedureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async procedure(query: ProcedureQuery): Promise<ProcedureResponse> {
    const procedureResponse = await this.prisma.procedure.findUnique({
      where: query.id ? { id: query.id } : { name: query.name },
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

  async createProcedure(data: createProcedureDTO): Promise<ProcedureResponse> {
    const alreadyExist = await this.prisma.procedure.findUnique({
      where: {
        name: data.name,
      },
    });

    if (alreadyExist) {
      throw new BadRequestException();
    }

    const procedureResponse = await this.prisma.procedure.create({
      data: data,
    });

    return new ProcedureResponse(procedureResponse);
  }

  async deleteProcedure(query: ProcedureQuery): Promise<ProcedureResponse> {
    try {
      return await this.prisma.procedure.delete({
        where: query.id ? { id: query.id } : { name: query.name },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
