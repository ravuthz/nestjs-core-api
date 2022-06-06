import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';
import { results } from './mockData';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

jest.setTimeout(90 * 1000);

describe('UserController', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let service: UserService;
  let controller: UserController;

  let user: User = null;

  beforeAll(async () => {

    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot(), UserModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();

    orm = app.get<MikroORM>(MikroORM);
    service = app.get<UserService>(UserService);
    controller = app.get<UserController>(UserController);

    user = await service.create(new CreateUserDto({
      firstName: 'demo3',
      lastName: 'user',
      email: 'demo+3@delete.com',
      username: 'demo@delete',
      password: '123123',
    }));

  });

  afterAll(async () => {
    await orm.em.nativeDelete(User, { username: { $like: 'demo@%' } });
    await orm.close(true);
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users from database', async () => {
      expect(await controller.findAll()).toBeTruthy();
    });
    it('should return an array of users using mockedUser', async () => {
      jest.spyOn(service, 'findAll')
        .mockImplementation(async () => results);
      expect(await controller.findAll()).toBe(results);
    });
  });

  describe('findOne', () => {
    it('should return an user from database', async () => {
      expect(await controller.findOne('1')).toBeTruthy();
    });
    it('should return an user using mockedUser', async () => {
      jest.spyOn(service, 'findOne')
        .mockImplementation(async () => results[0]);
      expect(await controller.findOne('1')).toBe(results[0]);
    });
  });

  describe('create', () => {
    it('should return an user after created successfully', async () => {
      const body = new CreateUserDto({
        firstName: 'demo1',
        lastName: 'user',
        email: 'demo+1@gmail.com',
        username: 'demo@create',
        password: '123123',
      });

      expect(await controller.create(body)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should return an user after updated successfully', async () => {
      const body = new UpdateUserDto({
        firstName: 'demo2',
        lastName: 'user',
        email: 'demo+2@gmail.com',
        username: 'demo@update',
        password: '123123',
      });
      expect(await controller.update('' + user.id, body)).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should return null after deleted successfully', async () => {
      expect(await controller.remove('' + user.id)).toBeFalsy();
    });
  });

});
