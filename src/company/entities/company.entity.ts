import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Space } from './space.entity';
import { Role } from '../../user/entities/Role.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({})
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

  @OneToMany(() => Role, (role) => role.company)
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;
}
