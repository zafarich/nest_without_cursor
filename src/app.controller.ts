import { Controller, Get, Header, Headers, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  getHello(): string {
    return this.appService.getHello();
  }

  // Bir nechta headerlarni olish
  @Get('multiple')
  getMultipleHeaders(
    @Headers('authorization') auth: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return { auth, userAgent };
  }

  @Get('test')
  async findAll() {
    return [22];
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return params?.id;
  }
}
