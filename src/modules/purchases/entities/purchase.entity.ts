import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { User } from '../../users/entities/user.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (i) => i.id)
  item: Item;

  @ManyToOne(() => User, (u) => u.id)
  user: User;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  price: number;
}
