import { Collection, Entity, EntityRepositoryType, ManyToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Role } from '../../role/entities/role.entity';
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

  @ManyToMany()
  roles: Collection<Role> = new Collection<Role>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

  async getAllRoleNames() {
    await this.roles.init();
    return this.roles.getItems().map(item => item.name);
  }

  async getAllPermissionNames() {
    await this.roles.init();

    let permissions = [];
    for (let role of this.roles.getItems()) {
      await role.permissions.init();
      permissions = [...permissions, ...role.permissions.getItems()];
    }
    return permissions.map(item => item.name);
  }

}
