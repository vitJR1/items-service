import { DataSource } from 'typeorm';
import { Purchase } from './entities/purchase.entity';

export const purchasesProvider = [
  {
    provide: 'PURCHASES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Purchase),
    inject: ['DATA_SOURCE'],
  },
];
