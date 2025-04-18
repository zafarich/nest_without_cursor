import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { IApiResponse } from '@common/interfaces/api-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const errorResponse: IApiResponse = {
      success: false,
      error_code: status,
      error_message: exception.message,
      data: null,
    };

    // Agar response.data mavjud bo'lsa, uni qo'shamiz
    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'object' && exceptionResponse['data']) {
      errorResponse.data = exceptionResponse['data'];
    }

    // Validatsiya xatoliklari uchun
    if (status === 400 && exceptionResponse['message'] instanceof Array) {
      errorResponse.data = exceptionResponse['message'].map((message) => ({
        field: message.split(' ')[0],
        message: message,
      }));
      errorResponse.error_message = 'Validation failed';
    }

    this.logger.error({
      message: `${request.method} ${request.url}`,
      error: errorResponse,
      stack: exception.stack,
    });

    response.status(status).json(errorResponse);
  }
}
