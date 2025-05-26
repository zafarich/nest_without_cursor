import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSuperuserDto } from './dto/create-superuser.dto';
import { Superuser } from './entities/superuser.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class SuperusersService {
  constructor(
    @InjectRepository(Superuser)
    private superusersRepository: Repository<Superuser>,
    private usersService: UsersService,
  ) {}

  async create(createSuperuserDto: CreateSuperuserDto) {
    const createUserDto: CreateUserDto = {
      first_name: createSuperuserDto.first_name,
      last_name: createSuperuserDto.last_name,
      phone: createSuperuserDto.phone,
      password: createSuperuserDto.password,
      role: createSuperuserDto.role,
    };

    const user = await this.usersService.create(createUserDto);

    // Keyin superuser yaratamiz
    const superuser = this.superusersRepository.create({
      user: user,
      isActive: createSuperuserDto.is_active,
    });

    return this.superusersRepository.save(superuser);
  }
}
