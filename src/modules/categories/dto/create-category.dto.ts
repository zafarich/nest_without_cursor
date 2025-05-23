import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ExpenseType } from '@/common/enums/expense-type.enum';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ExpenseType)
  type: ExpenseType;
}
