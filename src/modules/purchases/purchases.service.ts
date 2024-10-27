import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ILike, Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { ItemsService } from '../items/items.service';
import toPaginated from '../../utils/pagination/paginated.list.parse';
import { User } from '../users/entities/user.entity';
import { PurchaseListFiterDto } from './dto/purchase-list-fiter.dto';
import { plainToInstance } from 'class-transformer';
import { Item } from '../items/entities/item.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PURCHASES_REPOSITORY')
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto, userId: number) {
    const item = await this.itemsService.findOne(createPurchaseDto.item);
    const user = await this.usersService.findOne(userId);
    if (item?.quantity < createPurchaseDto.quantity) {
      throw new HttpException("Doesn't have enough items.", 400);
    }

    if (user?.balance < createPurchaseDto.quantity * item.min_price) {
      throw new HttpException("The user doesn't have enough funds.", 400);
    }

    return await this.purchaseRepository.manager.transaction(async (em) => {
      const userBalance = await em
        .getRepository(User)
        .createQueryBuilder()
        .update()
        .set({ balance: () => ' balance - :sum ' })
        .setParameters({ sum: item.min_price })
        .where({ id: userId })
        .returning(['balance'])
        .execute();

      user.balance = userBalance.raw[0].balance;

      await em
        .getRepository(Item)
        .createQueryBuilder()
        .update()
        .set({ quantity: () => ' quantity - :pc ' })
        .setParameters({ pc: createPurchaseDto.quantity })
        .where({ id: item.id })
        .execute();
      return await em.getRepository(Purchase).save({
        item,
        user,
        quantity: createPurchaseDto.quantity,
        price: item.min_price,
      });
    });
  }

  findAll(purchaseListFiterDto: PurchaseListFiterDto) {
    return this.purchaseRepository
      .findAndCount({
        where: {
          item:
            purchaseListFiterDto.search?.length > 0
              ? plainToInstance(Item, {
                  market_hash_name: ILike(`%${purchaseListFiterDto.search}%`),
                })
              : undefined,
        },
        take: purchaseListFiterDto.take,
        skip: purchaseListFiterDto.skip,
        order: {
          [(purchaseListFiterDto.field as keyof Purchase) ?? 'id']:
            purchaseListFiterDto.by ?? 'DESC',
        },
      })
      .then(toPaginated);
  }

  findOne(id: number) {
    return this.purchaseRepository.findOneBy({ id });
  }
}
