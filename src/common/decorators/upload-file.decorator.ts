// src/common/decorators/upload-file.decorator.ts
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

export function UploadSingleFile(
  fieldName: string,
  destinationFolder: string = 'uploads',
) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: join(process.cwd(), 'public', destinationFolder),
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = file.originalname.split('.').pop();
            cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
          },
        }),
      }),
    ),
  );
}
