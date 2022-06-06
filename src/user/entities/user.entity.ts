import { Entity, EntityRepositoryType, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserRepository } from '../user.repository';

@Entity({ tableName: 'users', customRepository: () => UserRepository })
export class User {

  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  @Exclude()
  password: string;

  @Property({ nullable: true })
  profileImage?: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

}
