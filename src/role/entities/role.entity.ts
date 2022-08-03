import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  @ManyToMany(() => User, user => user.roles)
  users: Collection<User> = new Collection<User>(this);

  @ManyToMany()
  permissions: Collection<Permission> = new Collection<Permission>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<Role> = {}) {
    Object.assign(this, partial);
  }

  async getAllPermissionNames() {
    await this.permissions.init();
    return this.permissions.getItems().map(item => item.name);
  }

}
