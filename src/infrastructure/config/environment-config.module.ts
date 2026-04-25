import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validateEnvironmentVariables } from './environment-config.validation';
// import { validateEnvironmentVariables } from './environment-config.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : `${process.cwd()}/env/${process.env.NODE_ENV || 'development'}.env`,

      validate: validateEnvironmentVariables,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule { }
