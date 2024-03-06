import { BadRequestException, Injectable } from '@nestjs/common';
import { Procedure as procedureModel, Prisma } from '@prisma/client';
import { PrismaService } from '../../external/prisma/prisma.service';
import { ProcedureResponse } from './model/procedure.response';

@Injectable()
export class ProcedureService {
  constructor(private prisma: PrismaService) {}

  async procedure(
    procedureWhereUniqueInput: Prisma.ProcedureWhereUniqueInput,
  ): Promise<procedureModel | null> {
    return this.prisma.procedure.findUnique({
      where: procedureWhereUniqueInput,
    });
  }

  async procedures(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProcedureWhereUniqueInput;
    where?: Prisma.ProcedureWhereInput;
    orderBy?: Prisma.ProcedureOrderByWithRelationInput;
  }): Promise<procedureModel[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.procedure.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProcedure(
    data: Prisma.ProcedureCreateInput,
  ): Promise<ProcedureResponse> {
    const alreadyExist = await this.prisma.procedure.findUnique({
      where: {
        name: data.name,
      },
    });

    if (alreadyExist) {
      throw new BadRequestException();
    }

    return this.prisma.procedure.create({
      data,
    });
  }

  async deleteProcedure(procedureName: string) {
    const procedure = await this.prisma.procedure.delete({
      where: { name: procedureName },
    });
    return procedure;
  }
}
