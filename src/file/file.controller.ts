import { Controller, Post, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileService.saveFile(file);
    return { message: 'File uploaded successfully' };
  }

  @Get()
  getFiles() {
    return this.fileService.getFiles();
  }
}
