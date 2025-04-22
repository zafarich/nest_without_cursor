import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gender } from '@common/enums/gender.enum';
import { EmploymentType } from '@common/enums/employment-type.enum';
import { Role } from '@modules/role/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    nullable: true,
  })
  middle_name: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({
    nullable: true,
  })
  passport_series: string;

  @Column({
    nullable: true,
  })
  passport_number: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  date_of_birth: Date;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    nullable: false,
  })
  employment_type: EmploymentType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  hourly_rate: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  monthly_salary: number;

  @Column({
    default: true,
  })
  is_active: boolean;

  @Column({
    nullable: true,
  })
  comment: string;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
