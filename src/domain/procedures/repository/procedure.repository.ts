import { ProcedureResponse } from '../model/procedure.model';
import { createProcedureDTO } from '../model/procedure.model.dto';
import { ProcedureQuery } from '../procedure.service';

export abstract class ProcedureRepository {
  abstract procedure: (query: ProcedureQuery) => Promise<ProcedureResponse>;
  abstract procedures: (id: number) => Promise<ProcedureResponse[]>;
  abstract createProcedure: (
    body: createProcedureDTO,
  ) => Promise<ProcedureResponse>;
  abstract deleteProcedure: (
    query: ProcedureQuery,
  ) => Promise<ProcedureResponse>;
}
