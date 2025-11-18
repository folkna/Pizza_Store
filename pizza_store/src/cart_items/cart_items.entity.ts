import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { Cart } from 'src/carts/carts.entity';

@Entity('cart_products')
export class Cart_Product {
    @PrimaryGeneratedColumn()
    Cartproduct_Id: number;

    @Column('int')
    Cartproduct_Quantity: number;

    @ManyToOne(() => Product, (product) => product.cart_products, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "Product_Id" })
    product: Product | null;

    @ManyToOne(() => Cart, (cart) => cart.cart_products, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "Cart_Id" })
    cart: Cart;

}

