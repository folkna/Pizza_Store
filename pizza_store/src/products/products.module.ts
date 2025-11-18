import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Employee } from 'src/employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product , Employee])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
