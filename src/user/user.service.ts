import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { FindOptions } from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {
  }

  private async saveData(body: any, id: number) {
    if (!body) {
      return null;
    }
    const user = id ? await this.findOne(id) : new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.username = body.username;
    user.password = body.password;
    user.profileImage = body.profileImage;
    if (id) {
      await this.userRepository.merge(user);
    } else {
      await this.userRepository.persist(user);
    }
    return user;
  }

  async findAll(options: FindOptions<User, never> = {}): Promise<User[]> {
    return await this.userRepository.findAll(options);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.saveData(createUserDto, null);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.saveData(updateUserDto, id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id: +id });
    await this.userRepository.remove(user);
    return null;
  }
}
