import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './categories';
import { Brand } from './brands';
import { OrderDetail } from './order_details';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    product_id?: number;

    @Column({ type: 'varchar', length: 100 })
    product_name?: string;

    @Column({ type: 'text' })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price?: number;

    @Column({ type: 'int' })
    stock_quantity?: number;

    @ManyToOne(() => Category, (category) => category.products)
    category?: Category;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand?: Brand;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails?: OrderDetail[];
}
