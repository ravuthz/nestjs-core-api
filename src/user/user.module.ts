import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserUniqueRule } from './user-unique-rule.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserUniqueRule],
  exports: [UserService, UserRepository],
})
export class UserModule {}
