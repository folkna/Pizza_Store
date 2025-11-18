import { Repository } from "typeorm";
import { Delivery } from "./deliveries.entity";
import { Order } from "src/orders/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeliveriesService {
    constructor(
        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async createDelivery(orderId: number): Promise<Delivery> {

        // 1. หา order
        const order = await this.orderRepository.findOne({ where: { Order_Id: orderId } });
        if (!order) throw new Error('ไม่พบข้อมูลออเดอร์');

        // 2. สร้าง delivery number
        const now = new Date();
        const monthStr = now.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // DEC
        const yearStr = now.getFullYear(); // 2025
        const dayStr = String(now.getDate()).padStart(2, '0'); // 01

        // 3. หาเลขลำดับล่าสุดของวันนี้
        const datePrefix = `${monthStr}${yearStr}${dayStr}`; // DEC202501
        const lastDelivery = await this.deliveryRepository
            .createQueryBuilder('delivery')
            .where('delivery.Delivery_Number LIKE :prefix', { prefix: `${datePrefix}%` })
            .orderBy('delivery.Delivery_Number', 'DESC')
            .getOne();

        let sequence = '000001'; // default
        if (lastDelivery) {
            const lastSeq = parseInt(lastDelivery.Delivery_Number.slice(-6)); // เอา 6 ตัวท้าย
            sequence = String(lastSeq + 1).padStart(6, '0');
        }

        const deliveryNumber = `${datePrefix}${sequence}`;

        // 4. สร้าง Delivery
        const delivery = this.deliveryRepository.create({
            Delivery_Number: deliveryNumber,
            Delivery_Status: 'กำลังจัดส่ง',
            order: order,
        });

        order.Order_Status = 'กำลังจัดส่ง';
        await this.orderRepository.save(order);
        console.log(order);

        // 6. บันทึก Delivery
        return this.deliveryRepository.save(delivery);
    }

    async findAll(): Promise<Delivery[]> {
        return this.deliveryRepository.find({ relations: ['order', 'order.member'] });
    }

    async findByMemberId(memberId: string): Promise<Delivery[]> {
        return this.deliveryRepository.find({
            relations: ['order', 'order.member'],
            where: {
                order: {
                    member: { Mem_Id: memberId }
                }
            },
        });
    }
}
