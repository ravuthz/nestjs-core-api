import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from '../../role/entities/role.entity';

@Entity({ tableName: 'permissions' })
export class Permission {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  note: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles = new Collection<Role>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(partial: Partial<Permission> = {}) {
    Object.assign(this, partial);
  }

  static makePermission(model, action) {
    const name = `${model}:${action}`.toLowerCase();
    const note = `Generate ${action} for ${model} by system`;
    return new Permission({ name, note });
  }

  static makeCrudFor(model) {
    return [
      Permission.makePermission(model, 'create'),
      Permission.makePermission(model, 'read'),
      Permission.makePermission(model, 'update'),
      Permission.makePermission(model, 'delete'),
    ];
  }

}
