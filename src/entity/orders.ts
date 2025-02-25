import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { OrderDetail } from './order_details';
import { Payment } from './payments';
import { User } from './users';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    order_id?: number;

    @ManyToOne(() => User, (user) => user.orders)
    user?: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    order_date?: Date;

    @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'] })
    status?: 'pending' | 'completed' | 'cancelled';

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount?: number;

    @Column({ type: 'varchar', length: 255 })
    shipping_address?: string;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetails?: OrderDetail[];

    @OneToMany(() => Payment, (payment) => payment.order)
    payments?: Payment[];
}
