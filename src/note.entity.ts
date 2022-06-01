import { Property, Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Note {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(name: string) {
    this.name = name;
  }
}
