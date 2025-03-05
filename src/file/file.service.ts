import { Injectable } from '@nestjs/common';
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  private readonly uploadPath = join(__dirname, '../../uploads');

  constructor() {
    mkdirSync(this.uploadPath, { recursive: true });
  }

  saveFile(file: Express.Multer.File) {
    const filepath = join(this.uploadPath, file.originalname);
    writeFileSync(filepath, file.buffer);
  }

  getFiles() {
    return readdirSync(this.uploadPath);
  }

  getFile(filename: string) {
    const filepath = join(this.uploadPath, filename);
    return readFileSync(filepath);
  }
}
