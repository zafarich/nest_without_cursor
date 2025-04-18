import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '@common/interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        // Agar response allaqachon IApiResponse formatida bo'lsa
        if (response?.hasOwnProperty('success')) {
          return response;
        }

        // Oddiy response uchun
        return {
          success: true,
          error_code: null,
          error_message: null,
          data: response,
        };
      }),
    );
  }
}
