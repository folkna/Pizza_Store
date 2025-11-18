import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }

  // หาพนักงานทั้งหมด
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  // หาพนักงานตามรหัสพนักงาน
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { Emp_Id: id } });
    if (!employee) {
      throw new NotFoundException(`ไม่พบข้อมูลพนักงาน ID : ${id}`);
    }
    return employee;
  }

  // สร้างพนักงานใหม่
  async create(data: Partial<Employee>): Promise<Employee> {
    const existingUser = await this.employeeRepository.findOne({
      where: { Emp_Username: data.Emp_Username },
    });

    if (existingUser) {

      throw new Error('มีชื่อผู้ใช้งานนี้อยู่แล้ว');
    }

    const newEmployee = this.employeeRepository.create(data);
    return await this.employeeRepository.save(newEmployee);
  }

  // การเข้าสู่ระบบพนักงาน
  async login(identifier: string, password: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: [{ Emp_Username: identifier }],
    });

    if (!employee) {
      throw new Error("ไม่พบผู้ใช้งาน");
    }

    if (employee.Emp_Status !== "ปกติ") {
      throw new Error("คุณไม่มีสิทธิเข้าสู่ระบบได้");
    }

    if (employee.Emp_Password !== password) {
      throw new Error("รหัสผ่านไม่ถูกต้อง");
    }

    return employee;
  }

  // อัปเดตพนักงาน
  async update(id: number, data: Partial<Employee>): Promise<Employee> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('ไม่พบข้อมูลพนักงาน');
    }

    if (data.Emp_Username && data.Emp_Username !== employee.Emp_Username) {
      const existing = await this.employeeRepository.findOne({
        where: { Emp_Username: data.Emp_Username }
      });

      if (existing) {
        throw new ConflictException('มีชื่อผู้ใช้นี้ในระบบแล้ว');
      }
    }

    Object.assign(employee, data);
    return await this.employeeRepository.save(employee);
  }

}
