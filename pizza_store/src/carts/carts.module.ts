import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Address } from 'src/addresses/addessess.entity';
import { Member } from 'src/members/member.entity';
import { Cart } from './carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart ,Address, Member])],
  providers: [CartsService],
  controllers: [CartsController]
})
export class CartsModule {}
