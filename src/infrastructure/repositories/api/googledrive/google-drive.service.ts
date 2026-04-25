import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { IGoogleDriveRepository } from '@domain/repositories/api/googledrive.interface';
import { google, drive_v3 } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GoogleDriveService implements IGoogleDriveRepository {
  private drive: drive_v3.Drive;

  constructor(
    private readonly environmentConfig: EnvironmentConfigService,
  ) {
    const auth = new google.auth.OAuth2(
      this.environmentConfig.getGoogleClientId(),
      this.environmentConfig.getGoogleClientSecret(),
    );

    auth.setCredentials({
      refresh_token: this.environmentConfig.getGoogleRefreshToken(),
    });

    this.drive = google.drive({ version: 'v3', auth });
  }
  async uploadFile(
    date: Date,
    jobId: string,
    subfolderName: string,
    file: Express.Multer.File,
  ) {
    const rootFolderId = '1L8pgBU2espTYvbugy9Sk-xwXRzy-clth';

    const mainFolderName = `${date}_${jobId}`;

    // 1. หา/สร้าง folder หลัก
    const mainFolderId = await this.findOrCreateFolder(
      mainFolderName,
      rootFolderId,
    );

    // 2. หา/สร้าง subfolder
    const subFolderId = await this.findOrCreateFolder(
      subfolderName,
      mainFolderId,
    );

    // 3. upload file
    const response = await this.drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: file.mimetype,
        parents: [subFolderId],
      },
      media: {
        mimeType: file.mimetype,
        body: require('stream').Readable.from(file.buffer),
      },
      fields: 'id',
      supportsAllDrives: true, // ✅ เพิ่มตัวนี้
    });

    const fileId = response.data.id;

    // 4. ทำ public
    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return {
      fileId,
      url: `https://drive.google.com/uc?id=${fileId}`,
    };
  }

  private async findOrCreateFolder(name: string, parentId?: string): Promise<string> {
    const query = [
      `mimeType = 'application/vnd.google-apps.folder'`,
      `name = '${name}'`,
      `trashed = false`,
      parentId ? `'${parentId}' in parents` : null,
    ]
      .filter(Boolean)
      .join(' and ');

    const res = await this.drive.files.list({
      q: query,
      fields: 'files(id, name)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    if (res.data.files && res.data.files.length > 0) {
      return res.data.files[0].id!;
    }

    const folder = await this.drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined,
      },
      fields: 'id',
      supportsAllDrives: true, // ✅ เพิ่ม
    });

    return folder.data.id!;
  }
}
