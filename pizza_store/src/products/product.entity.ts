import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { Cart_Product } from 'src/cart_items/cart_items.entity';
import { Employee } from 'src/employees/employees.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    Product_Id: number;

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    @JoinColumn({ name: "Category_Id" })
    category: Category;

    @Column({ length: 150 })
    Product_Name: string;

    @Column("int")
    Product_Price: number;

    @Column("int")
    Product_Quantity: number;

    @Column({ length: 100 })
    Product_Status: string;

    @Column("int")
    Product_Unitcost: number;

    @Column({ type: 'varchar', length: 300, nullable: true })
    Product_Image: string | null;

    @OneToMany(() => Cart_Product, (cart_product) => cart_product.cart)
    cart_products: Cart_Product[];

    @ManyToOne(() => Employee, (employee) => employee.products, { eager: true })
    @JoinColumn({ name: "Emp_Id" })
    employee: Employee;
}