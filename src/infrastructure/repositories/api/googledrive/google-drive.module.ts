import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { GoogleDriveService } from './google-drive.service';

@Module({
  imports: [HttpModule, EnvironmentConfigModule],
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule { }
