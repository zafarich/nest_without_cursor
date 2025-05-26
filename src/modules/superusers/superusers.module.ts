import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperusersService } from './superusers.service';
import { SuperusersController } from './superusers.controller';
import { Superuser } from './entities/superuser.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Superuser]), UsersModule],
  controllers: [SuperusersController],
  providers: [SuperusersService],
  exports: [SuperusersService],
})
export class SuperusersModule {}
