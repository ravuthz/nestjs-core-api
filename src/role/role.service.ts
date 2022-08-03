import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MikroORM } from '@mikro-orm/core';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly orm: MikroORM) {
  }

  private async saveData(body: any, id: number) {
    if (!body) {
      return null;
    }

    await this.isExist(body);

    const role = id ? await this.findOne(id) : new Role();
    role.name = body.name;
    role.note = body.note;
    await this.orm.em.persistAndFlush(role);
    return role;
  }

  async findAll(options = {}) {
    return await this.orm.em.findAndCount(Role, options);
  }

  async findOne(id: number) {
    return await this.orm.em.findOneOrFail(Role, { id });
  }

  async create(createRoleDto: CreateRoleDto) {
    return this.saveData(createRoleDto, null);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.saveData(updateRoleDto, id);
  }

  async remove(id: number) {
    const role = this.findOne(id);
    await this.orm.em.removeAndFlush(role);
    return null;
  }

  async isExist({ name }: any) {
    const exists = await this.orm.em.count(Role, { name });
    if (exists > 0) {
      throw new BadRequestException('The name must be unique');
    }
  }
}
