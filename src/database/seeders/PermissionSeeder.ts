import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Permission } from '../../permission/entities/permission.entity';
import { Role } from '../../role/entities/role.entity';
import { User } from '../../user/entities/user.entity';
import { Logger } from '@nestjs/common';

export class PermissionSeeder extends Seeder {

  private readonly logger = new Logger(PermissionSeeder.name);

  async run(em: EntityManager): Promise<void> {

    const crud1 = Permission.makeCrudFor(User.name);
    crud1.forEach(item => em.create(Permission, item));

    const crud2 = Permission.makeCrudFor(Role.name);
    crud2.forEach(item => em.create(Permission, item));

    const crud3 = Permission.makeCrudFor(Permission.name);
    crud3.forEach(item => em.create(Permission, item));

    this.logger.debug('Seeding permission ...', {
      crud1, crud2, crud3,
    });

    const role1 = await em.findOne(Role, { name: 'admin'});
    role1.permissions.add(...crud1);
    role1.permissions.add(...crud2);
    role1.permissions.add(...crud3);

  }

}
