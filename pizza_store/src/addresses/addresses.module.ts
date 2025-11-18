import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { Address } from './addessess.entity';
import { AddressesController } from './addresses.controller';
import { Member } from 'src/members/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Member])],
  providers: [AddressesService],
  controllers: [AddressesController]
})
export class AddressesModule {}
