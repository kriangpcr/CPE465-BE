import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  development = 'developement',
}

class EnvironmentVariables {
  // @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_KEY: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  GOOGLE_GEMINI_KEY: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;
}

export function validateEnvironmentVariables(
  env: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
