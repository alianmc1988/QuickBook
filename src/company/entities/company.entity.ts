import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Space } from './space.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  address: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Space, (space) => space.company)
  spaces: Space[];

  @CreateDateColumn()
  createdAt: Date;
}
