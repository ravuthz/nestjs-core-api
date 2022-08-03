import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../role/entities/role.entity';
import { Logger } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

export class RoleSeeder extends Seeder {

  private readonly logger = new Logger(RoleSeeder.name);

  async run(em: EntityManager): Promise<void> {
    const role1 = em.create(Role, {
      name: 'admin',
      note: '',
    });

    const role2 = em.create(Role, {
      name: 'user',
    });

    this.logger.debug('Seeding role ...', {
      role1, role2,
    });

    const user1 = await em.findOne(User, { username: 'adminz'});
    const user2 = await em.findOne(User, { username: 'ravuthz'});
    const user3 = await em.findOne(User, { username: 'user'});
    const user4 = await em.findOne(User, { username: 'editor'});
    const user5 = await em.findOne(User, { username: 'visitor'});

    user1.roles.add(role1);
    await em.persistAndFlush(user1);

    role2.users.add(user2);
    role2.users.add(user3);
    role2.users.add(user4);
    role2.users.add(user5);

    user2.roles.add(role2);
    user3.roles.add(role2);
    user4.roles.add(role2);
    user5.roles.add(role2);

    await em.persistAndFlush(role2);

    this.logger.debug('Seeding role with user ...', {
      role1, role2,
    });

  }

}
