import { UserDto } from '../user/dto/user-dto';
import { User } from '../user/entities/user.entity';

export const toUserDto = (data: User): UserDto => {
  const { id, email, username, firstName, lastName, profileImage } = data;
  return { id: '' + id, email, username, firstName, lastName, profileImage };
};
