import {
  IApiResponse,
  IValidationError,
  IWarning,
} from '../interfaces/api-response.interface';

// 1. Oddiy muvaffaqiyatli response
export function successResponse<T>(data: T): IApiResponse<T> {
  return {
    success: true,
    data,
  };
}

// 2. Ogohlantirishlar bilan response
export function successWithWarnings<T>(
  data: T,
  warnings: IWarning[],
): IApiResponse<T> {
  return {
    success: true,
    data,
    warnings,
  };
}

// 3. Validatsiya xatoliklari
export function validationErrorResponse(
  errors: IValidationError[],
): IApiResponse<IValidationError[]> {
  return {
    success: false,
    error_code: 400,
    error_message: 'Validation failed',
    data: errors,
  };
}

// 4. Batch operatsiya natijasi
export function batchOperationResponse<T>(
  data: T[],
  succeeded: number,
  failed: number,
): IApiResponse<T[]> {
  return {
    success: true,
    data,
    metadata: {
      total: succeeded + failed,
      succeeded,
      failed,
    },
    warnings:
      failed > 0
        ? [
            {
              code: 'PARTIAL_SUCCESS',
              message: `${failed} ta element muvaffaqiyatsiz yakunlandi`,
            },
          ]
        : undefined,
  };
}

// 5. Tizim xatoligi
export function systemErrorResponse(
  message: string,
  code: number = 500,
): IApiResponse<null> {
  return {
    success: false,
    error_code: code,
    error_message: message,
    data: null,
  };
}
