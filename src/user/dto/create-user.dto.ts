import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
    // @Validate(UserUniqueRule, [User, 'email'], { message: `User already exists with email field` })
  email: string;

  @IsNotEmpty()
  @IsString()
    // @Validate(UserUniqueRule, [User, 'username'], { message: `User already exists with username field` })
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  profileImage: string;

  constructor(partial: Partial<CreateUserDto> = {}) {
    Object.assign(this, partial);
  }
}
