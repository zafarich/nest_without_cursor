import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { phone },
    });
    return user || undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user || undefined;
  }

  async findByIdWithRelations(
    id: number,
    relations: string[],
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations,
    });
    return user || undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(id: number, updateUserDto: DeepPartial<User>): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
