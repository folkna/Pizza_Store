import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Cart } from 'src/carts/carts.entity';
import { Member } from 'src/members/member.entity';
import { Delivery } from 'src/deliveries/deliveries.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    Order_Id: number;

    @Column('int')
    Order_Amount: number;

    @Column({ length: 50 })
    Order_Status: string;

    @Column({ type: 'date' })
    Order_Date: Date;

    @Column({ length: '255' })
    Order_Address: string;

    @ManyToOne(() => Member, (member) => member.orders)
    @JoinColumn({ name: 'Mem_Id' })
    member: Member;

    @ManyToOne(() => Cart, (cart) => cart.orders)
    @JoinColumn({ name: 'Cart_Id' })
    cart: Cart;

    @OneToOne(() => Delivery, delivery => delivery.order)
    delivery: Delivery;
}
