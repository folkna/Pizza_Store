
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Member } from 'src/members/member.entity';
import { Address } from 'src/addresses/addessess.entity';
import { Cart_Product } from 'src/cart_items/cart_items.entity';
import { Order } from 'src/orders/order.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  Cart_Id: number;

  @Column({ type: "date" })
  Cart_Sdate: string;

  @Column({ length: 50 })
  Cart_Status: string;

  @ManyToOne(() => Member, (member) => member.carts, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "Mem_Id" })
  member: Member;

  @ManyToOne(() => Address, (address) => address.carts, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "Address_Id" })
  address: Address;

  @OneToMany(() => Cart_Product, (cart_product) => cart_product.cart)
  cart_products: Cart_Product[];

  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[];

}

