import { Injectable, Logger } from '@nestjs/common';
import { mkdirSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name);
    private readonly basePath = '/var/services/static'; // 기본 경로

    constructor() {
        mkdirSync(join(this.basePath, 'videos'), { recursive: true });
        mkdirSync(join(this.basePath, 'images'), { recursive: true });
        mkdirSync(join(this.basePath, 'docs'), { recursive: true });
    }

    saveFile(file: Express.Multer.File) {
        this.logger.verbose(`FileService Layer trying to save file: ${file.originalname}`);

        // 파일 확장자 확인
        const fileExtension = extname(file.originalname).toLowerCase();
        let uploadPath;

        // 확장자에 따라 경로 설정
        if (['.mp4', '.avi', '.mov', '.mkv'].includes(fileExtension)) {
            uploadPath = join(this.basePath, 'videos');
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(fileExtension)) {
            uploadPath = join(this.basePath, 'images');
        } else {
            uploadPath = join(this.basePath, 'docs');
        }

        const filepath = join(uploadPath, file.originalname);
        writeFileSync(filepath, file.buffer);

        this.logger.verbose(`FileService saved file to: ${filepath}`);
    }

    getFiles(type: 'videos' | 'images' | 'docs') {
        const targetPath = join(this.basePath, type);
        this.logger.verbose(`FileService Layer trying to get files list from: ${targetPath}`);
        return readdirSync(targetPath);
    }

    getFilePath(filename: string, type: 'videos' | 'images' | 'docs'): string {
        return join(this.basePath, type, filename);
    }
}
