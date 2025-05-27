import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  @Length(12, 12, {
    message: "Telefon raqam uzunligi 12 ta belgi bo'lishi kerak",
  })
  @Matches(/^998[0-9]{9}$/, {
    message: "Telefon raqam formati noto'g'ri. Masalan: 998901234567",
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
