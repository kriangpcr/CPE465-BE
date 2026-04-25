import { UploadDriveRequestDto } from '@infrastructure/dtos/google/upload-drive.dto';
import { GoogleDriveService } from '@infrastructure/repositories/api/googledrive/google-drive.service';
import {
    Injectable,
} from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
@Injectable()
export class UploadDriveUseCase implements UseCase<
    {
        body: UploadDriveRequestDto;
        file: Express.Multer.File;
    },
    any
> {
    constructor(private readonly googleDriveService: GoogleDriveService) { }

    async execute(ctx: { body: UploadDriveRequestDto, file: Express.Multer.File }): Promise<any> {
        const file = ctx.file;
        const date = ctx.body.date;
        const jobId = ctx.body.jobId;
        const subfolderName = ctx.body.subfolderName;

        return await this.googleDriveService.uploadFile(date, jobId, subfolderName, file);
    }
}
