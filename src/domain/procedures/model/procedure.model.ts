import { Procedure as ProcedureModel } from '@prisma/client';

export class ProcedureResponse implements ProcedureResponseModel {
  id: number;
  name: string;
  price: number;
  requiredTimeMin: number;
  procedureImage: string;

  constructor(procedure: ProcedureModel) {
    this.id = procedure.id;
    this.name = procedure.name;
    this.price = procedure.price;
    this.requiredTimeMin = procedure.requiredTimeMin;
    this.procedureImage = procedure.procedureImage;
  }
}

export type ProcedureResponseModel = Omit<
  ProcedureModel,
  'createdAt' | 'updatedAt'
>;
