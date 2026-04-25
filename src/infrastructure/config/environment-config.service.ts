import { EnvironmentConfig } from '@domain/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private readonly configService: ConfigService) { }
  getGoogleClientSecret(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  }
  getGoogleRefreshToken(): string {
    return this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
  }
  getGoogleClientEmail(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_EMAIL');
  }
  getGooglePrivateKey(): string {
    return this.configService.get<string>('GOOGLE_PRIVATE_KEY');
  }
  getGooglePrivateKeyId(): string {
    return this.configService.get<string>('GOOGLE_PRIVATE_KEY_ID');
  }
  getGoogleClientId(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }
  getSupabaseUrl(): string {
    return this.configService.get<string>('SUPABASE_URL');
  }
  getSupabaseKey(): string {
    return this.configService.get<string>('SUPABASE_KEY');
  }
  getGeminiKey(): string {
    return this.configService.get<string>('GOOGLE_GEMINI_KEY');
  }
  getPort(): number {
    return this.configService.get<number>('PORT');
  }
}
