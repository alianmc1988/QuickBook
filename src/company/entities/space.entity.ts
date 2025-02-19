import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { SpaceTypes } from '../valueObjects/SpaceTypes.enum';

@Entity()
export class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SpaceTypes })
  type: SpaceTypes;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Company, (company) => company.spaces)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;
}
