import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/carts.entity';
import { Cart_Product } from './cart_items.entity';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart , Cart_Product , Product])],
  providers: [CartItemsService],
  controllers: [CartItemsController]
})
export class CartItemsModule {}
