import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthJwtProvider } from './auth.jwt.provider';
import { GlobalJwtModule } from '../../core/jwt/jwt.module';

@Module({
  imports: [UsersModule, GlobalJwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtProvider],
})
export class AuthModule {}
