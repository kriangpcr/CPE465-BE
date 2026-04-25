import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { BusinessAnalysisService } from '@infrastructure/repositories/api/business-analysis/business-analysis.service';
import { UploadDriveUseCase } from '@usecases/google_drive/upload-drive.use-case';
import { GoogleDriveService } from '@infrastructure/repositories/api/googledrive/google-drive.service';
import { GoogleDriveModule } from '@infrastructure/repositories/api/googledrive/google-drive.module';

@Module({
  imports: [DatabaseModule, EnvironmentConfigModule, GoogleDriveModule],
})
export class UploadDriveUsecasesProxyModule {
  static UPLOAD_DRIVE_USECASE = 'UploadDriveUseCase';

  static register(): DynamicModule {
    return {
      module: UploadDriveUsecasesProxyModule,
      providers: [
        {
          inject: [GoogleDriveService],
          provide: UploadDriveUsecasesProxyModule.UPLOAD_DRIVE_USECASE,
          useFactory: (googleDriveService: GoogleDriveService) =>
            new UseCaseProxy(new UploadDriveUseCase(googleDriveService)),
        },
      ],
      exports: [UploadDriveUsecasesProxyModule.UPLOAD_DRIVE_USECASE],
    };
  }
}
