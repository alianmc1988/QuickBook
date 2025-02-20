import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from './entities/Role.entity';
import { UUID } from 'crypto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    const mockUserRepository: jest.Mocked<Partial<Repository<User>>> = {
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('General UserService class testSuit', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(userRepository).toBeDefined();
    });
  });

  describe('FindOne method testSuit', () => {
    describe('Success Path', () => {
      it('should call findOne method', async () => {
        const userMocked: User = {
          id: 'ac7dd0cf-8b2f-4a98-a1f2-842406fcc5ba',
          name: 'Test User',
          email: 'test@example.com',
          password: 'password',
          roles: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        (userRepository.findOne as jest.Mock).mockResolvedValue(userMocked);

        const user = await service.findOne(userMocked.id as UUID);

        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { id: userMocked.id },
          relations: ['roles'],
        });
        expect(user).toEqual(userMocked);
      });
    });

    describe('Failure paths', () => {});
  });

  describe('Find method testSuit', () => {
    describe('Success Path', () => {
      it('should call find method', async () => {
        const userMocked: User[] = [
          {
            id: 'ac7dd0cf-8b2f-4a98-a1f2-842406fcc5ba',
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
            roles: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ];
        (userRepository.find as jest.Mock).mockReturnValue(userMocked);
        const users = await service.find();

        expect(userRepository.find).toHaveBeenCalled();
        expect(users).toBeInstanceOf(Array);
        expect(users).toEqual(userMocked);
      });

      it(`If there is no Users in DB
        Then it should return an empty array`, async () => {
        (userRepository.find as jest.Mock).mockReturnValue([]);
        const users = await service.find();

        expect(userRepository.find).toHaveBeenCalled();
        expect(users).toBeInstanceOf(Array);
        expect(users).toEqual([]);
      });
    });
  });
});
