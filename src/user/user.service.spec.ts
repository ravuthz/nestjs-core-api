import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { results, result } from './mockData';

const mockedService = {
  findAll: () => [],
  findOne: (id: number) => null,
  create: (body: CreateUserDto) => null,
  update: (id: number, body: UpdateUserDto) => null,
  remove: (id: number) => null,
};

describe('UserService', () => {
  let repository: UserRepository;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    })
      .overrideProvider(UserService)
      .useValue(mockedService)
      .compile();

    repository = module.get<UserRepository>(UserRepository);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    jest.spyOn(service, 'findAll')
      .mockImplementation(async () => results);
    expect(await service.findAll()).toBe(results);
  });

  it('should get a single user', async () => {
    jest.spyOn(service, 'findOne')
      .mockImplementation(async () => result);
    expect(await service.findOne(1)).toBe(result);
  });

  it('should get a single user', async () => {
    jest.spyOn(service, 'findOne')
      .mockImplementation(async () => result);
    expect(await service.findOne(1)).toBe(result);
  });

  it('should create a single user', async () => {
    jest.spyOn(service, 'create')
      .mockImplementation(async () => result);
    const body = new CreateUserDto();
    expect(await service.create(body)).toBe(result);
    expect(await service.create).toHaveBeenCalled();
    expect(await service.create).toHaveBeenCalledWith(body);
  });

  it('should update a single user', async () => {
    jest.spyOn(service, 'update')
      .mockImplementation(async () => result);
    const body = new UpdateUserDto();
    expect(await service.update(1, body)).toBe(result);
    expect(await service.update).toHaveBeenCalled();
    expect(await service.update).toHaveBeenCalledWith(1, body);
  });

  it('should delete a single user', async () => {
    jest.spyOn(service, 'remove')
      .mockImplementation(async () => null);
    expect(await service.remove(1)).toBe(null);
    expect(await service.remove).toHaveBeenCalled();
    expect(await service.remove).toHaveBeenCalledWith(1);
  });

});
