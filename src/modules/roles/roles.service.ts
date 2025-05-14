import { Injectable } from '@nestjs/common';
import { IRole } from '@modules/roles/interfaces/roles.interface';

@Injectable()
export class RolesService {
  getAll(): IRole[] {
    return [];
  }
}
