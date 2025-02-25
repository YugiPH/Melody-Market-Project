import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    category_id?: number;

    @Column({ type: 'varchar', length: 50 })
    category_name?: string;

    @Column({ type: 'text' })
    description?: string;

    @OneToMany(() => Product, (product) => product.category)
    products?: Product[];
}
