import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './users';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    address_id?: number;

    @Column({ type: 'varchar', length: 100 })
    province_name?: string;

    @OneToMany(() => User, (user) => user.address)
    users?: User[];
}
