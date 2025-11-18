import { Controller, Get, Post, Body, Param, Put, Session, BadRequestException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { Res } from '@nestjs/common';
import { type Response } from 'express';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post('auth/login')
  async login(
    @Body() body: { identifier: string; password: string },
    @Session() session: Record<string, any>
  ) {
    try {
      const employee = await this.employeesService.login(body.identifier, body.password);

      // เก็บข้อมูลสมาชิกลง session
      session.employeeId = employee.Emp_Id;
      session.employeeName = `${employee.Emp_Fname} ${employee.Emp_Lname}`;
      return { success: true, employee };
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
      path: '/Dashboard',
    });

    return { loggedIn: false };
  }

  @Get('auth/me')
  getEmployee(@Session() session: Record<string, any>) {
    // ตรวจสอบ session
    if (!session.employeeId) return { loggedIn: false };
    return {
      loggedIn: true,
      employeeId: session.employeeId,
      employeeName: session.employeeName,
    };
  }


  @Get()
  async getAll(): Promise<Employee[]> {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Employee> {
    return await this.employeesService.findOne(id);
  }


  @Post()
  async create(@Body() data: Partial<Employee>): Promise<Employee> {
    return await this.employeesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Employee,
  ): Promise<Employee> {
    return await this.employeesService.update(id, data);
  }

}
