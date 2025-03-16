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

    @Get(':type') // type 매개변수를 추가
    getFiles(@Param('type') type: 'videos' | 'images' | 'docs') {
        this.logger.verbose(`Retrieving Files of type: ${type}`);
        return this.fileService.getFiles(type); // type 인자를 전달
    }

    @Get(':type/:filename') // type 매개변수를 추가
    getFile(@Param('type') type: 'videos' | 'images' | 'docs', @Param('filename') filename: string, @Res() res) {
        const filePath = this.fileService.getFilePath(filename, type); // type 인자를 전달
        return res.sendFile(filePath); // 파일 전송
    }
}