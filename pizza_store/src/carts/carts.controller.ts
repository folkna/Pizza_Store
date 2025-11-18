import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from './carts.entity';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {
    }

    @Post()
    async create(@Body() body: any): Promise<Cart> {
        return this.cartsService.create(body);
    }

    @Get(':memberId')
    async getOrCreateCart(@Param('memberId') memberId: string): Promise<Cart> {
        return this.cartsService.getOrCreateCart(memberId);
    }

    @Put(':id')
    async updateCart(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    ) {
        return this.cartsService.updateCart(id, body.addressId);
    }


}
