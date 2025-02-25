import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products';

@Entity('brand')
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id?: number;

    @Column({ type: 'varchar', length: 100 })
    brand_name?: string;

    @Column({ type: 'varchar', length: 50 })
    country?: string;

    @Column({ type: 'text' })
    description?: string;

    @OneToMany(() => Product, (product) => product.brand)
    products?: Product[];
}
