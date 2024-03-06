import { Procedure as ProcedureModel } from '@prisma/client';

export class ProcedureResponse
  implements Omit<ProcedureModel, 'createdAt' | 'updatedAt'>
{
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
