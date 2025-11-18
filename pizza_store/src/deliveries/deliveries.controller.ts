import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { Delivery } from './deliveries.entity';

@Controller('deliveries')
export class DeliveriesController {
    constructor(private readonly deliveriesService: DeliveriesService) {}

    @Get()
    async findAll() : Promise<Delivery[]> {
        return await this.deliveriesService.findAll();
    }

    @Get('member/:memberId')
    async findByMemberId(@Param('memberId') memberId: string) : Promise<Delivery[]> {
        return await this.deliveriesService.findByMemberId(memberId);
    }

    @Post()
    async createDelivery(@Body() body: any) : Promise<Delivery> {
        return await this.deliveriesService.createDelivery(body.orderId);
    }
}
