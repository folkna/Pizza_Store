import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get("/member/:memberid")
    findByMemberId(@Param('memberid') memberId: string): Promise<Order[]> {
        return this.ordersService.findByMemberId(memberId);
    }

    @Get("/status/:status")
    findByStatus(@Param('status') status: string): Promise<Order[]> {
        return this.ordersService.findByStatus(status);
    }

    @Post()
    async create(@Body() body: any): Promise<Order> {
        if (!body) throw new Error('Body is undefined');

        const date = new Date();
        const orderData: Partial<Order> & { memberId: string, cartId: number } = {
            memberId: body.memberId,
            cartId: body.cartId,
            Order_Amount: body.order_amount,
            Order_Status: "กำลังจัดเตรียมอาหาร",
            Order_Date: date,
            Order_Address : body.order_address,
        };

        return this.ordersService.create(orderData);
    }

}
