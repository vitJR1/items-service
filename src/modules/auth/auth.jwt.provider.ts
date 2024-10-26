import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthJwtProvider {
  constructor(private readonly jwt: JwtService) {}

  sign(id: number) {
    return this.jwt.sign({ id });
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}
