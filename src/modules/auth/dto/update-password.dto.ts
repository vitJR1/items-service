import { IsString, IsStrongPassword } from 'class-validator';
import passwordPolicy from '../../../utils/policy/password.policy';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsStrongPassword(passwordPolicy)
  newPassword: string;
}
