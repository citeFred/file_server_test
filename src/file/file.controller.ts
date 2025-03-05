import { Controller, Post, Get, UploadedFile, UseInterceptors, Logger, Param, Res } from '@nestjs/common';
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

    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res) {
        const filePath = this.fileService.getFilePath(filename); // 파일 경로를 반환하는 메소드
        return res.sendFile(filePath); // 파일 전송
    }
}
