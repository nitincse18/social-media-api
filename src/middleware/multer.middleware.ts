// multer.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private upload:any;

  constructor() {
    this.upload = multer({
        storage: multer.memoryStorage(), // Specify the destination directory for uploaded files
    });
  }

  use(req: any, res: any, next: () => void) {
    this.upload.single('file')(req, res, next);
  }
}
