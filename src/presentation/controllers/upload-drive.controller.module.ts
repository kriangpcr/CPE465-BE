import { BusinessIdeaDto } from '@infrastructure/dtos/business_analysis/business-analysis.dto';
import { UploadDriveRequestDto } from '@infrastructure/dtos/google/upload-drive.dto';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { BusinessAnalysisUsecasesProxyModule } from '@infrastructure/usecases-proxy/business-analysis-usecases-proxy.module';
import { UploadDriveUsecasesProxyModule } from '@infrastructure/usecases-proxy/upload-drive-usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import { Body, Controller, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AnalysisIdeaUseCase, UploadDriveUseCase } from '@usecases/index';

@Controller({ path: 'upload-drive' })
@ApiTags('Upload Drive')
export class UploadDriveController {
  constructor(
    @Inject(UploadDriveUsecasesProxyModule.UPLOAD_DRIVE_USECASE)
    private readonly uploadDriveUseCase: UseCaseProxy<UploadDriveUseCase>,
  ) { }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date' },
        jobId: { type: 'string' },
        subfolderName: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() body: UploadDriveRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadDriveUseCase.getUseCase().execute({
      body,
      file,
    });
  }
}
