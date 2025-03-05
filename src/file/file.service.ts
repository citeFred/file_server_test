import { Injectable, Logger } from '@nestjs/common';
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name);
    
    //   private readonly uploadPath = '/Users/fred/Documents/projects/uploads'; // Use Absolute Path
    private readonly uploadPath = join(__dirname, '../../../uploads'); // Use Relative Path

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
        return readdirSync(this.uploadPath);
    }

    getFile(filename: string) {
        const filepath = join(this.uploadPath, filename);
        return readFileSync(filepath);
    }
}
