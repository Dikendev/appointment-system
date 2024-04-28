import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcedureDto implements ProcedureCreateModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  requiredTimeMin: number;

  @IsOptional()
  @IsString()
  procedureImage?: string;
}

export type ProcedureCreateModel = Prisma.ProcedureCreateInput;

export class ProcedureModel {
  id: number;
  name: string;
  price: number;
  requiredTimeMin: number;
  procedureImage: string;
  createdAt: Date;
  updatedAt: Date;
}
