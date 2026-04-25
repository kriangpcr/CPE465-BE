export interface IGoogleDriveRepository {
    uploadFile(date: string, jobId: string, subfolderName: string, file: Express.Multer.File,): Promise<any>;
}
