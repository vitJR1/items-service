import { IsString, IsStrongPassword } from 'class-validator';
import passwordPolicy from '../../../utils/policy/password.policy';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({ required: true })
  oldPassword: string;

  @IsStrongPassword(passwordPolicy)
  @ApiProperty({ required: true })
  newPassword: string;
}
