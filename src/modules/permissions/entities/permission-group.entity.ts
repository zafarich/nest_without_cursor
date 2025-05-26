import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('permission_groups')
export class PermissionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, default: 0 })
  order: number;

  @OneToMany(() => Permission, (permission) => permission.group)
  permissions: Permission[];
}
