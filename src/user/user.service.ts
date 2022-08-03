import { FindOptions } from '@mikro-orm/core';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { toUserDto } from '../shared/mappers';
import { comparePasswords, encryptPassword } from '../shared/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  private async saveData(body: any, id: number) {
    if (!body) {
      return null;
    }

    await this.isExist(body);

    const user = id ? await this.findOne(id) : new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.username = body.username;
    if (body.password) {
      user.password = await encryptPassword(body.password);
    }
    user.profileImage = body.profileImage;
    // await this.userRepository.persistAndFlush(user);
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

  async isExist({ email, username }: any) {
    const exists = await this.userRepository.count({
      $or: [{ email }, { username }],
    });
    if (exists > 0) {
      throw new BadRequestException('The email and username must be unique');
    }
  }

  async findByPayload(payload: any): Promise<User> {
    return await this.userRepository.findOne(payload);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    // const user = await this.userRepository.findOne({ username });
    const user = await this.findByPayload({ username });

    if (!user) {
      throw new UnauthorizedException('User was not found');
    }

    const matchPasswords = await comparePasswords(user.password, password);

    if (!matchPasswords) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return toUserDto(user);
  }
}
