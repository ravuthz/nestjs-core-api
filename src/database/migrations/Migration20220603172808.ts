import { Migration } from '@mikro-orm/migrations';

export class Migration20220603172808 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "profile_image" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
  }

}
