export interface IGoogleDriveRepository {
    uploadFile(date: Date, jobId: string, subfolderName: string, file: Express.Multer.File,): Promise<any>;
}
