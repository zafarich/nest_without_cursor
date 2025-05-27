import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { IApiResponse } from '@common/interfaces/api-response.interface';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const errorResponse: any = {
      success: false,
      error_code: status,
      error_message: exception.message,
      data: null,
    };

    const exceptionResponse = exception.getResponse();

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      if (Array.isArray(exceptionResponse)) {
        errorResponse.data = exceptionResponse;
        errorResponse.error_message = 'Validation failed';
      } else {
        errorResponse.message =
          (exceptionResponse as any).message || 'Validation failed';
        if ((exceptionResponse as any).error) {
          errorResponse.error = (exceptionResponse as any).error;
        }
      }
    } else {
      errorResponse.message =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        (exceptionResponse as any).message
          ? (exceptionResponse as any).message
          : exception.message;

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        (exceptionResponse as any).error
      ) {
        errorResponse.error = (exceptionResponse as any).error;
      }
    }

    this.logger.error({
      message: `${request.method} ${request.url}`,
      error: errorResponse,
      stack: exception.stack,
    });

    response.status(status).json(errorResponse);
  }
}
