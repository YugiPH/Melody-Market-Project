import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address';
import { Order } from './orders';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ type: 'varchar', length: 255 })
  username?: string;

  @Column({ type: 'varchar', length: 100 })
  email?: string;

  @Column({ type: 'varchar', length: 255 })
  password?: string;

  @Column({ type: 'varchar', length: 20 })
  phone?: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role?: 'admin' | 'user';

  @Column({ type: 'varchar', length: 255 })
  image?: string;

  @ManyToOne(() => Address, (address) => address.users)
  address?: Address;

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders?: Order[];
}
