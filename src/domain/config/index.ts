import { GoogleConfig } from './google.interface';
import { ServerConfig } from './server.interface';

export * from './server.interface';

export interface EnvironmentConfig extends ServerConfig, GoogleConfig {}
