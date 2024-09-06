import { ProcedureDto } from '../../entities/dtos';
import { Procedure } from '../../entities/models';

export abstract class IProcedureRepository {
  abstract findById: (id: number) => Promise<Procedure>;
  abstract findAll: () => Promise<Procedure[]>;
  abstract create: (procedureCreateDto: ProcedureDto) => Promise<Procedure>;
  abstract deleteById: (id: number) => Promise<Procedure>;
}
