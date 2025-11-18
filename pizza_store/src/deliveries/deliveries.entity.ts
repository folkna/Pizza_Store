
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/orders/order.entity';

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn()
    Delivery_Id: number;

    @Column({ length: 15 })
    Delivery_Number: string;

    @Column({ length: 50 })
    Delivery_Status: string;

    @OneToOne(() => Order, order => order.delivery)
    @JoinColumn({ name: 'Order_Id' })
    order: Order;

}

