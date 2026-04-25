export interface IGoogleDriveRepository {
    uploadFile(date: Date, jobId: string, subfolderName: string, files: Express.Multer.File[]): Promise<any>;
}
