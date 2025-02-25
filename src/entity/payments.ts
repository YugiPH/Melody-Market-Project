import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id?: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order?: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date?: Date;

  @Column({ type: 'varchar', length: 50 })
  payment_method?: string;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'] })
  status?: 'pending' | 'completed' | 'failed';
}
