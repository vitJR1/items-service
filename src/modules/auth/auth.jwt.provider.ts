import { JwtService } from '@nestjs/jwt';

export class AuthJwtProvider {
  constructor(private readonly jwt: JwtService) {}

  sign(id: number) {
    return this.jwt.sign({ id });
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}
