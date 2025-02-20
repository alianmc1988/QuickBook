import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './entities/Role.entity';

describe('UserController', () => {
  let controller: UserController;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // You can use a mock instead
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository, // You can use a mock instead
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('repositories should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(roleRepository).toBeDefined();
  });
});
