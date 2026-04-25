import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDriveRequestDto {
    @ApiProperty({ example: '2026-04-23' })
    @IsString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ example: 'JOB12345' })
    @IsString()
    @IsNotEmpty()
    jobId: string;

    @ApiProperty({ example: 'before' })
    @IsString()
    @IsNotEmpty()
    subfolderName: string;
}
