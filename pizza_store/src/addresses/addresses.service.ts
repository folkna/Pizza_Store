import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../addresses/addessess.entity'; // import entity Address ของคุณ
import { Member } from 'src/members/member.entity';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private addressesRepository: Repository<Address>,

        @InjectRepository(Member)
        private membersRepository: Repository<Member>,
    ) { }

    // ดึงที่อยู่ตามรหัสสมาชิก
    async findByMemberId(memberId: string): Promise<Address[]> {
        return this.addressesRepository.find({
            where: { member: { Mem_Id: memberId } },
            relations: ['member'],
        });
    }


    // สร้างที่อยู่ใหม่
    async create(body: any): Promise<Address> {
        const member = await this.membersRepository.findOne({
            where: { Mem_Id: body.Mem_Id }, // ใช้ชื่อ field ใน entity
        });
        if (!member) throw new Error('ไม่พบข้อมูลสมาชิก');

        const addressData: Partial<Address> = {
            member,
            Address_Latitude: Number(body.Address_Latitude),
            Address_Longitude: Number(body.Address_Longitude),
            Address_String: body.Address_String,
        };

        const address = this.addressesRepository.create(addressData);
        return this.addressesRepository.save(address);
    }

    // ดึงที่อยู่ตามรหัสที่อยู่
    async findByAddressId(addressId: number): Promise<Address> {
        const address = await this.addressesRepository.findOne({
            where: { Address_Id: addressId }
        });
        if (!address) {
            throw new Error(`ไม่พบข้อมูลที่อยู่ ID : ${addressId}`);
        }
        return address;
    }

    // ลบที่อยู่
    async remove(id: number): Promise < void> {
            const existingAddress = await this.addressesRepository.findOneBy({ Address_Id: id });
            if(!existingAddress) {
                throw new NotFoundException(`ไม่พบข้อมูลที่อยู่ ID : ${id}`);
            }
        await this.addressesRepository.delete(id);
        }
    }

