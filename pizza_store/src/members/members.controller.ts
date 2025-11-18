import { Controller, Post, Body, Session, BadRequestException, Get, Put, Param, Delete , Res } from '@nestjs/common';
import {type Response } from 'express';
import { MembersService } from './members.service';
import { Member } from './member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @Post('auth/login')
  async login(
    @Body() body: { identifier: string; password: string },
    @Session() session: Record<string, any>
  ) {
    try {
      const member = await this.membersService.login(body.identifier, body.password);

      // เก็บข้อมูลสมาชิกลง session
      session.memberId = member.Mem_Id;
      session.memberName = `${member.Mem_Fname} ${member.Mem_Lname}`;

      return { loggedIn: true, member };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('auth/logout')
  async logout(@Session() session: any, @Res({ passthrough: true }) res: Response) {
    if (session) {
      await new Promise<void>((resolve, reject) => {
        session.destroy((err: any) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    // ลบ cookie ฝั่ง client ให้ตรงกับ session config
    res.clearCookie('connect.sid', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return { loggedIn: false };
  }

  @Get('auth/me')
  getMember(@Session() session: Record<string, any>) {
    // ตรวจสอบ session
    if (!session.memberId) return { loggedIn: false };
    return {
      loggedIn: true,
      memberId: session.memberId,
      memberName: session.memberName,
    };
  }


  // ดึงสมาชิกทั้งหมด
  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  // ดึงสมาชิกตาม ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Member> {
    return this.membersService.findOne(id);
  }

  @Post()
  async create(@Body() body: any): Promise<Member> {
    if (!body) throw new Error('Body is undefined');

    const lastMember = await this.membersService.findLast();
    const lastIdNum = lastMember
      ? parseInt(lastMember.Mem_Id.slice(4)) // เอาเลขหลังปี
      : 0;

    const year = new Date().getFullYear(); // 2025
    const date = new Date()
    const newId = year.toString() + (lastIdNum + 1).toString().padStart(4, '0');
    const memberData: Partial<Member> = {
      Mem_Id: newId,
      Mem_Email: body.Mem_Email,
      Mem_Sdate: date,
      Mem_Status: "ปกติ",
      Mem_Username: body.Mem_Username,
      Mem_Password: body.Mem_Password,
      Mem_Fname: body.Mem_Fname,
      Mem_Tel: body.Mem_Tel,
      Mem_Lname: body.Mem_Lname
    };

    return this.membersService.create(memberData as Member);
  }

  // อัปเดตสมาชิก
  @Put(':id')
  update(@Param('id') id: string, @Body() member: Member): Promise<Member> {
    return this.membersService.update(id, member);
  }

  // ลบสมาชิก
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.membersService.remove(id);
  }
}
