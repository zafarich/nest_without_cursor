import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gender } from '@common/enums/gender.enum';
import { EmploymentType } from '@common/enums/employment-type.enum';
import { User } from '@modules/users/entities/user.entity';
import { Company } from '@modules/companies/entities/company.entity';
@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  middleName: string;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: 'company_id' })
  company: Company;

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
  passportSeries: string;

  @Column({
    nullable: true,
  })
  passportNumber: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: EmploymentType,
    nullable: false,
  })
  employmentType: EmploymentType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  hourlyRate: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  monthlySalary: number;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    nullable: true,
  })
  comment: string;

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
