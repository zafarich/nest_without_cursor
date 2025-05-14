import { Controller, Get } from '@nestjs/common';
import { IRole } from '@modules/roles/interfaces/roles.interface';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getAll(): IRole[] {
    return this.rolesService.getAll();
  }
}
