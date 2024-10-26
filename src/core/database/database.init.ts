import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

export const databaseInit = async (
  source: DataSource,
  configService: ConfigService,
) => {
  await source.runMigrations();
  if ((await source.getRepository(User).count()) === 0) {
    await source.getRepository(User).save(
      plainToInstance(User, {
        name: configService.get<string>('root.name'),
        email: configService.get('root.email'),
        password: configService.get('root.password'),
      }),
    );
  }
  return source;
};
