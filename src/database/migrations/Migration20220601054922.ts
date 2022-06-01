import { Migration } from '@mikro-orm/migrations';

export class Migration20220601054922 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "note" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }
}
