import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './orders';
import { Product } from './products';

@Entity('order_details')
export class OrderDetail {
    @PrimaryGeneratedColumn()
    order_detail_id?: number;

    @ManyToOne(() => Order, (order) => order.orderDetails)
    order?: Order;

    @ManyToOne(() => Product, (product) => product.orderDetails)
    product?: Product;

    @Column({ type: 'int' })
    quantity?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price?: number;
}
