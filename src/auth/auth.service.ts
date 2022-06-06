import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(userDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(userDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto);
    return this._createToken(user);
  }

  async logout(): Promise<any> {
    //
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload({ username: payload.username });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  private _createToken({ username }: any): any {
    const expiresIn = process.env.EXPIRES_IN;
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      username,
      expiresIn,
      accessToken,
    };
  }
}
