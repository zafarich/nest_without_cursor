import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import {
  successResponse,
  successWithWarnings,
  validationErrorResponse,
  batchOperationResponse,
} from './response.examples';
import {
  IApiResponse,
  IValidationError,
} from '../interfaces/api-response.interface';

// User uchun interface
interface IUser {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
}

@Controller('users')
export class UsersController {
  // 1. Oddiy muvaffaqiyatli response
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IApiResponse<IUser>> {
    const user: IUser = { id, name: 'John' };
    return successResponse(user);
  }

  // 2. Ogohlantirishlar bilan response
  @Get(':id/profile')
  async getUserProfile(@Param('id') id: string): Promise<IApiResponse<IUser>> {
    const profile: IUser = { id, name: 'John', email: 'john@example.com' };
    return successWithWarnings(profile, [
      {
        code: 'INCOMPLETE_PROFILE',
        message: "Foydalanuvchi profili to'liq emas",
      },
    ]);
  }

  // 3. Validatsiya xatoliklari
  @Post()
  async createUser(
    @Body() userData: Partial<IUser>,
  ): Promise<IApiResponse<IUser | IValidationError[]>> {
    const errors: IValidationError[] = [];

    if (!userData.email) {
      errors.push({
        field: 'email',
        message: 'Email majburiy',
      });
    }
    if (!userData.password) {
      errors.push({
        field: 'password',
        message: 'Parol majburiy',
      });
    }

    if (errors.length > 0) {
      return validationErrorResponse(errors);
    }

    const newUser: IUser = { id: '123', ...userData };
    return successResponse(newUser);
  }

  // 4. Batch operatsiya
  @Post('bulk')
  async createUsers(
    @Body() usersData: Partial<IUser>[],
  ): Promise<IApiResponse<IUser[]>> {
    const results: IUser[] = [];
    let succeeded = 0;
    let failed = 0;

    for (const userData of usersData) {
      try {
        // Simulyatsiya: har 3-foydalanuvchi xato
        if (succeeded % 3 === 2) {
          failed++;
          continue;
        }
        results.push({ id: String(succeeded + 1), ...userData });
        succeeded++;
      } catch {
        failed++;
      }
    }

    return batchOperationResponse(results, succeeded, failed);
  }
}
