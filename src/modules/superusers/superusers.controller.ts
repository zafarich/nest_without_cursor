import { Controller, Post, Body } from '@nestjs/common';
import { SuperusersService } from './superusers.service';
import { CreateSuperuserDto } from './dto/create-superuser.dto';

@Controller('superusers')
export class SuperusersController {
  constructor(private readonly superusersService: SuperusersService) {}

  @Post('create')
  create(@Body() createSuperuserDto: CreateSuperuserDto) {
    console.log('body', createSuperuserDto);
    // return 'Hello';
    return this.superusersService.create(createSuperuserDto);
  }
}
