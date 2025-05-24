import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
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
