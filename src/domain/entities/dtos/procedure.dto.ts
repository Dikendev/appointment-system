import { z } from 'zod';

export const procedureSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  requiredTimeMin: z.number().optional(),
  procedureImage: z.string().optional(),
});

export type ProcedureDto = z.infer<typeof procedureSchema>;
