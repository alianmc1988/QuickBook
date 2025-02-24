import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, In } from 'typeorm';
import { UUID } from 'crypto';
import { Role } from './entities/Role.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name, { timestamp: true });
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Create User flow started');
    const newUser = this.userRepository.create(createUserDto);
    const userCreated = await this.userRepository.save(newUser);
    this.logger.log('User Created');
    return userCreated;
  }

  async find(): Promise<User[]> {
    this.logger.log('finding All Users flow started');
    return this.userRepository.find();
  }

  async findOne(id: UUID): Promise<User> {
    this.logger.log('Finding User By Id flow started');
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log('Finding User By Id flow ended successfully');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log('Update User flow started');

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    const userUpdated = await this.userRepository.save(user);
    this.logger.log('Update User flow ended successfully');

    return userUpdated;
  }

  async remove(id: string): Promise<void> {
    this.logger.log('Delete User flow started');

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.logger.log('Delete User Roles flow started');

    if (user.roles.length > 0) {
      await this.roleRepository.softDelete({
        id: In(user.roles.map((role: Role) => role.id)),
      });
    }

    this.logger.log('Delete User Roles flow ended successfully');

    await this.userRepository.softDelete(id);
    this.logger.log('Delete User flow ended successfully');
  }

  async restore(id: string): Promise<void> {
    this.logger.log('Restore User flow started');

    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.restore(id);
    this.logger.log('Restore User flow ended successfully');
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
      password,
    });
  }
}
