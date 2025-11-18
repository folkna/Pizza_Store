import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { Cart } from 'src/carts/carts.entity';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';
import { Cart_Product } from 'src/cart_items/cart_items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Member , Cart, Product , Cart_Product])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
