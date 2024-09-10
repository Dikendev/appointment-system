import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().min(1000).default(3000),
  DATABASE_URL: z.string(),

  ACCESS_JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRATION: z.string(),
  REFRESH_JWT_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRATION: z.string(),

  NODE_ENV: z.enum(['development', 'production']).default('development'),
  ORGANIZATION: z.string(),
  CONTEXT: z.string(),
  APP: z.string(),
});

const env = envSchema.parse(process.env);

export function validateEnv() {
  envSchema.parse(process.env);
}

export type env = z.infer<typeof envSchema>;

export default env;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends env {}
  }
}
