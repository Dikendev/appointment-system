import { z } from 'zod';

export const procedureSchema = z.object({
  name: z.string(),
  price: z.number(),
  requiredTimeMin: z.number(),
  procedureImage: z.string().optional(),
});

export type ProcedureDto = z.infer<typeof procedureSchema>;
