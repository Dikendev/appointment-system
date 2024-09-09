import { z } from 'zod';

export const cacheSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export type CacheDto = z.infer<typeof cacheSchema>;
