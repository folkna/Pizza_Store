import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Member } from '../members/member.entity';
import { Cart } from 'src/carts/carts.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(Member)
        private readonly membersRepository: Repository<Member>,
        @InjectRepository(Cart)
        private readonly cartsRepository: Repository<Cart>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Cart>,
    ) { }

    // ดึง Order ทั้งหมด
    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({
            relations: ['member', 'cart', 'cart.cart_products', 'cart.cart_products.product'],
            order: { Order_Date: "ASC", Order_Id: "ASC" }
        });
    }

    // ดึง Order ทั้งหมดของสมาชิก
    async findByMemberId(memberId: string): Promise<Order[]> {
        const member = await this.membersRepository.findOne({
            where: { Mem_Id: memberId },
        });

        if (!member) throw new NotFoundException('ไม่พบข้อมูลสมาชิก');

        return this.ordersRepository
            .createQueryBuilder("order")
            .innerJoinAndSelect("order.member", "member")
            .innerJoinAndSelect("order.cart", "cart")
            .innerJoinAndSelect("cart.cart_products", "cart_products")
            .innerJoinAndSelect("cart_products.product", "product")
            .leftJoinAndSelect("order.delivery", "delivery") // left join delivery
            .where("member.Mem_Id = :memberId", { memberId })
            .orderBy("order.Order_Id", "DESC")
            .getMany();
    }
    
    // ดึง Order ตามสถานะ
    async findByStatus(status: string): Promise<Order[]> {
        return this.ordersRepository.find({
            where: { Order_Status: status },
            relations: ['member', 'cart'],
        });
    }

    // สร้าง Order ใหม่
    async create(orderData: Partial<Order> & { memberId: string; cartId: number }): Promise<Order> {
        try {
            // โหลด member
            const member = await this.membersRepository.findOne({ where: { Mem_Id: orderData.memberId } });
            if (!member) throw new Error('ไม่พบข้อมูลสมาชิก');

            // โหลด cart พร้อม cart_products และ product
            const cart = await this.cartsRepository.findOne({
                where: { Cart_Id: orderData.cartId },
                relations: ['cart_products', 'cart_products.product'], // ต้องตรงกับ relation ที่แก้แล้ว
            });

            if (!cart) throw new Error('ไม่พบข้อมูลตะกร้าสินค้า');

            // ลดจำนวนสินค้า
            for (const item of cart.cart_products) {
                if (item.product) {
                    item.product.Product_Quantity -= item.Cartproduct_Quantity;
                    if (item.product.Product_Quantity < 0) item.product.Product_Quantity = 0;
                    await this.productsRepository.save(item.product);
                }
            }

            // เปลี่ยนสถานะ cart
            cart.Cart_Status = 'สั่งซื้อเรียบร้อย';
            await this.cartsRepository.save(cart);

            // สร้าง order
            const order = this.ordersRepository.create({
                Order_Amount: orderData.Order_Amount,
                Order_Status: orderData.Order_Status,
                Order_Date: orderData.Order_Date,
                Order_Address: orderData.Order_Address,
                member,
                cart,
            });

            return await this.ordersRepository.save(order);

        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('ไม่สามารถสร้างออเดอร์ได้');
        }
    }
}
