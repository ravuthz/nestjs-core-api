import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { toUserDto } from '../shared/mappers';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user-dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Permissions } from './decorators/permissions.decorator';
import { Roles } from './decorators/roles.decorator';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.authService.register(createUserDto);

    if (!user) {
      throw new HttpException('Failed to register', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Get('user/read')
  @Permissions('user:read')
  @UseGuards(AuthGuard(), PermissionsGuard)
  public async getUserRead(@Req() req: any): Promise<JwtPayload> {
    return toUserDto(req.user);
  }

  @Get('user/admin')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard(), RolesGuard)
  public async getUserAdmin(@Req() req: any): Promise<JwtPayload> {
    return toUserDto(req.user);
  }
}
