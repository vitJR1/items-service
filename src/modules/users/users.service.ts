import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserListFilterDto } from './dto/user-list.filter.dto';
import toPaginated from '../../utils/pagination/paginated.list.parse';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(userListFilterDto: UserListFilterDto) {
    return this.userRepository
      .findAndCount({
        relations: ['addresses'],
        where: [
          {
            name: userListFilterDto.search
              ? ILike(`%${userListFilterDto.search}%`)
              : undefined,
          },
          {
            email: userListFilterDto.search
              ? ILike(`%${userListFilterDto.search}%`)
              : undefined,
          },
        ],
        take: userListFilterDto.take,
        skip: userListFilterDto.skip,
        order: {
          [(userListFilterDto.field as keyof User) ?? 'id']:
            userListFilterDto.by ?? 'DESC',
        },
      })
      .then(toPaginated);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByIdOrFail(id: number) {
    return this.userRepository.findOneOrFail({
      select: ['id', 'password'],
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      select: ['id', 'password'],
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save(
      plainToInstance(User, { id, ...updateUserDto }),
    );
  }

  updateBalance(id: number, updateUserBalanceDto: UpdateUserBalanceDto) {
    return this.userRepository.save(
      plainToInstance(User, { id, balance: updateUserBalanceDto.balance }),
    );
  }

  updatePassword(id: number, password: string) {
    return this.userRepository.save(
      plainToInstance(User, {
        id,
        password,
      }),
    );
  }
}
