import { ProcedureDto } from '../../entities/dtos';
import { Procedure } from '../../entities/models';

export abstract class IProcedureRepository {
  abstract findById: (id: string) => Promise<Procedure>;
  abstract findAll: () => Promise<Procedure[]>;
  abstract create: (procedureCreateDto: ProcedureDto) => Promise<Procedure>;
  abstract deleteById: (id: string) => Promise<Procedure>;
}
