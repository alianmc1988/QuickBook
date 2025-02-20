import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: number;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => Company, (company) => company.roles)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;
}
