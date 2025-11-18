import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Cart_Product } from './cart_items.entity';
import { CartItemsService } from './cart_items.service';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartitemsService: CartItemsService) {}

  // ดึงรายการสินค้าในตะกร้า
  @Get(':id')
  async getItemsCart(@Param('id') id: number): Promise<Cart_Product[]> {
    return this.cartitemsService.getItemsCart(Number(id));
  }

  // ดึงรายการสินค้าเฉพาะ product ในตะกร้า
  @Get()
  async getItemsCartForMember(
    @Query('cartId') cartId: number,
    @Query('productId') productId?: number,
  ): Promise<Cart_Product[]> {
    return this.cartitemsService.getItemsCartForMember(
      Number(cartId),
      productId ? Number(productId) : undefined,
    );
  }

  // เพิ่มสินค้าในตะกร้า (เฉพาะ product)
  @Post(':id')
  async addItemsCartForMember(
    @Param('id') cartId: number,
    @Body() body: { productId: number; quantity: number },
  ): Promise<Cart_Product> {
    return this.cartitemsService.addItemsCartForMember(Number(cartId), body);
  }

  // Update: อัปเดต quantity หรือเปลี่ยน product
  @Put(':id')
  async updateItemsCartForMember(
    @Param('id') cartProductId: number,
    @Body() body: { quantity?: number; productId?: number },
  ): Promise<Cart_Product> {
    return this.cartitemsService.updateItemsCartForMember(Number(cartProductId), body);
  }

  // Delete: ลบสินค้าออกจากตะกร้า
  @Delete(':id')
  async deleteItemsCartForMember(@Param('id') id: number): Promise<void> {
    return this.cartitemsService.deleteItemsCartForMember(Number(id));
  }
}
