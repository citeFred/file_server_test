import { Injectable, Logger } from '@nestjs/common';
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name);

      private readonly uploadPath = '/var/services/video'; // Use Absolute Path
    // private readonly uploadPath = join(__dirname, '../../../../../video'); // Use Relative Path

    constructor() {
        mkdirSync(this.uploadPath, { recursive: true });
    }

    saveFile(file: Express.Multer.File) {
        this.logger.verbose(`FileService Layer trying to save file into: ${this.uploadPath}`);

        const filepath = join(this.uploadPath, file.originalname);
        writeFileSync(filepath, file.buffer);

        this.logger.verbose(`FileService had saved ${filepath}`);
    }

    getFiles() {
        this.logger.verbose(`FileService Layer trying to get files list from: ${this.uploadPath}`);
        return readdirSync(this.uploadPath);
    }

    getFilePath(filename: string): string {
        return join(this.uploadPath, filename); // 파일 경로를 문자열로 반환
    }
}
