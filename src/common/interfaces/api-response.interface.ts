export interface IValidationError {
  field: string;
  message: string;
}

export interface IWarning {
  code: string;
  message: string;
}

export interface IApiResponse<T = any> {
  success: boolean;
  error_code?: number;
  error_message?: string;
  warnings?: IWarning[];
  validation_errors?: IValidationError[];
  data: T | null;
  metadata?: {
    total?: number;
    failed?: number;
    succeeded?: number;
    [key: string]: any;
  };
}
