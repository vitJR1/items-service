import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from '../enum/currency.enum';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  market_hash_name: string;

  @Column({ type: 'varchar', length: 3 })
  currency: Currency;

  @Column({ type: 'varchar', length: 255 })
  item_page: string;

  @Column({ type: 'varchar', length: 255 })
  market_page: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  suggested_price: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  min_price: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  max_price: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  mean_price: number;

  @Column({ type: 'integer', default: 0 })
  quantity: number;

  @Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))' })
  created_at: bigint;

  @Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))' })
  updated_at: bigint;

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertOrUpdate() {
    this.updated_at = BigInt((+new Date() / 1000) | 0);
  }
}
