import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Employee } from '@modules/employees/entities/employee.entity';
import { Role } from '@modules/roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
    default: '',
  })
  middleName: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({
    select: false,
  })
  password: string;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

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
