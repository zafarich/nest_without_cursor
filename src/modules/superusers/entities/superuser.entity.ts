import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
@Entity('superusers')
export class Superuser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.employee)
  user: User;

  @Column({
    nullable: true,
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
