import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { compareSync } from 'bcrypt';
import { AuthJwtProvider } from './auth.jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authJwtProvider: AuthJwtProvider,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.usersService.findOneByEmail(authLoginDto.email);

    if (user == null || !compareSync(authLoginDto.password, user.password)) {
      throw new HttpException('Incorrect email or password', 401);
    }

    return {
      accessToken: this.authJwtProvider.sign(user.id),
    };
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersService.findOneByIdOrFail(userId);

    if (!compareSync(updatePasswordDto.oldPassword, user.password)) {
      throw new HttpException('Incorrect password', 401);
    }

    await this.usersService.updatePassword(
      userId,
      updatePasswordDto.newPassword,
    );

    return 'OK';
  }
}
