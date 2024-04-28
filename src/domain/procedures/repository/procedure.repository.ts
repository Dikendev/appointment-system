import { CreateProcedureDto, ProcedureResponse } from '../model';
import { ProcedureQuery } from '../procedure.service';

export abstract class ProcedureRepository {
  abstract procedure: (
    procedureQuery: ProcedureQuery,
  ) => Promise<ProcedureResponse>;

  abstract procedures: () => Promise<ProcedureResponse[]>;

  abstract servicesByCriteria: (
    procedureQuery: ProcedureQuery,
  ) => Promise<ProcedureResponse[]>;

  abstract createProcedure: (
    createProcedureDto: CreateProcedureDto,
  ) => Promise<ProcedureResponse>;

  abstract deleteProcedure: (
    procedureQuery: ProcedureQuery,
  ) => Promise<ProcedureResponse>;
}
