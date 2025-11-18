import { Product } from "src/products/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  Emp_Id: number;

  @Column({ type: "varchar", length: 100 })
  Emp_Fname: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Lname: string;

  @Column({ type: "varchar", length: 10 })
  Emp_Hnumber: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Alley: string;

  @Column({ type: "varchar", length: 10 })
  Emp_Village: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Street: string;

  @Column({ type: "varchar", length: 100 })
  Emp_District: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Subdistrict: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Province: string;

  @Column({ type: "varchar", length: 15 })
  Emp_Poscode: string;

  @Column({ type: "varchar", length: 15 })
  Emp_Tel: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Email: string;

  @Column({ type: "varchar", length: 100 })
  Emp_Role: string;

  @Column({ type: "varchar", length: 50})
  Emp_Status: string;

  @Column({ type: "int" })
  Emp_Workyear: number;

  @Column({ type: "int" })
  Emp_Salary: number;

  @Column({ type: "varchar", length: 10 })
  Emp_Username: string;

  @Column({ type: "varchar", length: 15 })
  Emp_Password: string;

  @OneToMany(() => Product, (product) => product.employee)
  products: Product[];

}
