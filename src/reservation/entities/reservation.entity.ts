import { Company } from 'src/company/entities/company.entity';
import { Space } from 'src/company/entities/space.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Space, (space) => space.id)
  space: Space;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirm', 'canceled'],
    default: 'pendiente',
  })
  state: 'pending' | 'confirm' | 'canceled';

  @CreateDateColumn()
  createdAt: Date;
}
