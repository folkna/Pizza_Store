import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Address } from 'src/addresses/addessess.entity';
import { Cart } from 'src/carts/carts.entity';
import { Order } from 'src/orders/order.entity';

@Entity('members')
export class Member {
  @PrimaryColumn({ length: 12 })
  Mem_Id: string;

  @Column({ length: 100 })
  Mem_Fname: string;

  @Column({ length: 100 })
  Mem_Lname: string;

  @Column({ length: 100 })
  Mem_Email: string;

  @Column({ length: 15 })
  Mem_Tel: string;

  @Column({type : "date"})
  Mem_Sdate: Date;

  @Column({ length: 50 })
  Mem_Status: string;

  @Column({ length: 20 })
  Mem_Username: string;

  @Column({ length: 20 })
  Mem_Password: string;

  @OneToMany(() => Address, (address) => address.member)
  addresses: Address[];

  @OneToMany(() => Cart, (cart) => cart.member)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.member)
  orders: Order[];
}

