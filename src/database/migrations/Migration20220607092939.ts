import { Migration } from '@mikro-orm/migrations';

export class Migration20220607092939 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "roles" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "roles" alter column "note" drop not null;');

    this.addSql('alter table "permissions" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "permissions" alter column "note" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "roles" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "roles" alter column "note" set not null;');

    this.addSql('alter table "permissions" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "permissions" alter column "note" set not null;');
  }

}
