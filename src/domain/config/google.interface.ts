export interface GoogleConfig {
  getGeminiKey(): string;
  getGoogleClientEmail(): string;
  getGooglePrivateKey(): string;
  getGooglePrivateKeyId(): string;
  getGoogleClientId(): string;
  getGoogleClientSecret(): string;
  getGoogleRefreshToken(): string;
}
