import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateClientDTO implements ClientCreateModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}

export type ClientCreateModel = Prisma.ClientCreateInput;
