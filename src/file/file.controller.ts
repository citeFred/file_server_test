import { Controller, Post, Get, UploadedFile, UseInterceptors, Logger } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/file')
export class FileController {
    private readonly logger = new Logger(FileController.name);

    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        this.logger.verbose(`Uploading ${file.originalname}, size:${file.size}, type:${file.mimetype}`);

        this.fileService.saveFile(file);

        this.logger.verbose(`File Uploaded successfully`);
        return { message: 'File uploaded successfully' };
    }

    @Get()
    getFiles() {
        return this.fileService.getFiles();
    }
}
