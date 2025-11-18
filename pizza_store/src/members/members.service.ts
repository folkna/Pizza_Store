import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private membersRepository: Repository<Member>,
    ) { }

    // หาข้อมูลสมาชิกทั้งหมด
    async findAll(): Promise<Member[]> {
        return this.membersRepository.find();
    }

    // Read: Get one member by Mem_Id
    async findOne(id: string): Promise<Member> {
        const member = await this.membersRepository.findOneBy({ Mem_Id: id });
        if (!member) {
            throw new NotFoundException(`ไม่พบข้อมูลสมาชิก ID : ${id}`);
        }
        return member;
    }

    // เพิ่มสมาชิกใหม่
    async create(member: Member): Promise<Member> {
        const existingMember = await this.membersRepository.findOne({
            where: { Mem_Username: member.Mem_Username }
        });

        if (existingMember) {
            throw new ConflictException('มีชื่อผู้ใช้นี้ในระบบแล้ว');
        }
        return this.membersRepository.save(member);
    }

    // การเข้าสู่ระบบสมาชิก
    async login(identifier: string, password: string): Promise<Member> {
        const member = await this.membersRepository.findOne({
            where: [
                { Mem_Username: identifier },
            ],
        });

        if (!member) {
            throw new Error('ไม่พบผู้ใช้งาน');
        }

        if (member.Mem_Status !== "ปกติ") {
            throw new Error("บัญชีถูกระงับการใช้งาน");
        }

        // ตรวจสอบ password (ถ้า hash ใช้ bcrypt)
        if (!(member.Mem_Password === password)) {
            throw new Error('รหัสผ่านไม่ถูกต้อง');
        }

        return member;
    }

    // อัปเดตสมาชิก
    async update(id: string, member: Partial<Member>): Promise<Member> {
        const existingMember = await this.membersRepository.findOneBy({ Mem_Id: id });
        if (!existingMember) {
            throw new NotFoundException(`ไม่พบข้อมูลสมาชิก ID : ${id}`);
        }
        await this.membersRepository.update(id, member);
        const updatedMember = await this.membersRepository.findOneBy({ Mem_Id: id });
        if (!updatedMember) {
            throw new NotFoundException(`ไม่สามารถอัปเดตข้อมูลสมาชิกได้`);
        }
        return updatedMember;
    }

    // ลบสมาชิก
    async remove(id: string): Promise<void> {
        const existingMember = await this.membersRepository.findOneBy({ Mem_Id: id });
        if (!existingMember) {
            throw new NotFoundException(`ไม่พบข้อมูลสมาชิก ID : ${id}`);
        }
        await this.membersRepository.delete(id);
    }

    // หาสมาชิกคนล่าสุด
    async findLast(): Promise<Member | null> {
        const members = await this.membersRepository.find({
            order: { Mem_Id: 'DESC' },
            take: 1, // เอาแค่ตัวล่าสุด
        });
        return members.length ? members[0] : null;
    }

}
