import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { NoteSeeder } from './NoteSeeder';
import { UserSeeder } from './UserSeeder';
import { RoleSeeder } from './RoleSeeder';
import { PermissionSeeder } from './PermissionSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      NoteSeeder,
      UserSeeder,
      RoleSeeder,
      PermissionSeeder,
    ]);
  }
}
