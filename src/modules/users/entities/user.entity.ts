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
import { Superuser } from '@modules/superusers/entities/superuser.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @OneToOne(() => Superuser, (superuser) => superuser.user)
  superuser: Superuser;

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
