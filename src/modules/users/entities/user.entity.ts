import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  created_at: string;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  updated_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertOrUpdate() {
    this.updated_at = new Date().toJSON();

    if (this.password) {
      this.password = hashSync(this.password, genSaltSync(12));
    }
  }
}
