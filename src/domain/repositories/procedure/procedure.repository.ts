import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Procedure } from '../../entities/models';
import { ProcedureDto } from '../../entities/dtos';
import { IProcedureRepository } from './procedure-repository.interface';

@Injectable()
export class ProcedureRepository implements IProcedureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Procedure> {
    const procedure = await this.prismaService.procedure.findUnique({
      where: { id: id },
    });

    if (!procedure) throw new NotFoundException();

    return procedure;
  }

  async findAll(): Promise<Procedure[]> {
    const procedures = await this.prismaService.procedure.findMany();

    if (!procedures.length) throw new NotFoundException();

    return procedures;
  }

  async create(procedureDto: ProcedureDto): Promise<Procedure> {
    try {
      return this.prismaService.procedure.create({
        data: {
          name: procedureDto.name,
          price: procedureDto.price,
          procedureImage: procedureDto.procedureImage,
          requiredTimeMin: procedureDto.requiredTimeMin,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteById(id: number): Promise<Procedure> {
    try {
      return await this.prismaService.procedure.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}