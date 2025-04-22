import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from '@modules/category/entities/category.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  logo: string;

  @Column()
  phone: string;

  @Column()
  description: string;

  @OneToMany(() => Category, (category) => category.company)
  categories: Category[];
}
