import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { AddressesService } from '../addresses/addresses.service';
import { Address } from './addessess.entity';

@Controller('addresses')
export class AddressesController {

    constructor(private readonly addressesService: AddressesService) {
    }

    @Post()
    async create(@Body() body: any): Promise<Address> {
        return this.addressesService.create(body);
    }


    @Get('member/:memberId')
    async getAddressesByMember(@Param('memberId') memberId: string) {
        return this.addressesService.findByMemberId(memberId);
    }

    @Get('address/:addressId')
    async getAddressesByAddress(@Param('addressId') addressId: number) {
        return this.addressesService.findByAddressId(addressId);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.addressesService.remove(parseInt(id));
    }

}
