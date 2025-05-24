import { IsBoolean } from 'class-validator';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';

export class CreateSuperuserDto extends CreateUserDto {
  @IsBoolean()
  is_active: boolean;
}
