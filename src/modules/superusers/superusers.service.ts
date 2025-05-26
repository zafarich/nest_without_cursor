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
    };

    const user = await this.usersService.create(createUserDto);

    // Keyin superuser yaratamiz
    // const superuser = this.superusersRepository.create({
    //   first_name: createSuperuserDto.first_name,
    //   last_name: createSuperuserDto.last_name,
    //   user,
    // });

    // return this.superusersRepository.save(superuser);
  }
}
