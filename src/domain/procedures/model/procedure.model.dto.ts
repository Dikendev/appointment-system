import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createProcedureDTO implements ProcedureCreateModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  requiredTimeMin: number;

  procedureImage?: string;
}

export type ProcedureCreateModel = Prisma.ProcedureCreateInput;
