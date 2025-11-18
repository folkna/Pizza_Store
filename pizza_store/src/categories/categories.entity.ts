import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/product.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    Category_Id: number;

    @Column({ length: 150 })
    Category_Name: string;

    @Column({ length: 300 })
    Category_Desc: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
