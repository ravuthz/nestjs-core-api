import { User } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';

export class UserRepository extends EntityRepository<User> {

}