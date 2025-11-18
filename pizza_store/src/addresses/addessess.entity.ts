import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Member } from 'src/members/member.entity';
import { Cart } from 'src/carts/carts.entity';

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    Address_Id: number;

    @ManyToOne(() => Member, (member) => member.addresses)
    @JoinColumn({ name: 'Mem_Id' })
    member: Member;

    @Column({ length: 500 })
    Address_String: string;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    Address_Latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    Address_Longitude: number;

    @OneToMany(() => Cart, (cart) => cart.address, { onDelete: 'CASCADE' })
    carts: Cart[];
}
