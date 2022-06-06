import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../user/entities/user.entity';
import { UserFactory } from '../factories/UserFactory';
import { Logger } from '@nestjs/common';
import { encryptPassword } from '../../shared/utils';

export class UserSeeder extends Seeder {

  private readonly logger = new Logger(UserSeeder.name);

  async run(em: EntityManager): Promise<void> {
    const password = await encryptPassword('123123');
    const user1 = em.create(User, {
      firstName: 'Admin',
      lastName: 'Mr',
      email: 'adminz@gmail.com',
      username: 'adminz',
      password,
    });

    const user2 = em.create(User, {
      firstName: 'Ravuth',
      lastName: 'Mr',
      email: 'ravuthz@gmail.com',
      username: 'ravuthz',
      password,
    });

    const user3 = em.create(User, {
      firstName: 'User',
      lastName: 'Mr',
      email: 'ravuthz+1@gmail.com',
      username: 'user',
      password,
    });

    const user4 = em.create(User, {
      firstName: 'Visitor',
      lastName: 'Mr',
      email: 'ravuthz+2@gmail.com',
      username: 'visitor',
      password,
    });

    const user5 = em.create(User, {
      firstName: 'Editor',
      lastName: 'Mr',
      email: 'ravuthz+3@gmail.com',
      username: 'editor',
      password,
    });

    const factory = new UserFactory(em);
    const users = await factory.create(10);

    this.logger.debug('Seeding user ...', {
      user1, user2, user3, user4, user5, users,
    });

  }

}
