import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperusersService } from './superusers.service';
import { SuperusersController } from './superusers.controller';
import { Superusers } from './entities/superuser.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Superusers]), UsersModule],
  controllers: [SuperusersController],
  providers: [SuperusersService],
  exports: [SuperusersService],
})
export class SuperusersModule {}
