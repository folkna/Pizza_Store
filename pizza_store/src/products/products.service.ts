import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) { }

    // หาสินค้าทั้งหมด
    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    // หาสินค้าทั้งหมดตามสถานะ
    async findAllByStatus(): Promise<Product[]> {
        return this.productsRepository.find({
            where: { Product_Status: "ปกติ" },
            order: { Product_Id: "DESC" }
        });
    }

    // หาสินค้าตามรหัสสินค้า
    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOneBy({ Product_Id: id });
        if (!product) {
            throw new NotFoundException(`ไม่พบข้อมูลสินค้า ID :${id}`);
        }
        return product;
    }

    // หาสินค้าตามหมวดหมู่
    async findCategory(category: string): Promise<Product[]> {
        return this.productsRepository.find({
            where: {
                Product_Status: "ปกติ",
                category: { Category_Name: category },
            },
            relations: ['category'],
        });
    }

    // สร้างสินค้าใหม่
    async create(product: Product): Promise<Product> {
        return this.productsRepository.save(product);
    }

    // อัปเดตสินค้า
    async update(id: number, data: Partial<Product>): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { Product_Id: id } });
        if (!product) {
            throw new NotFoundException(`ไม่พบข้อมูลสินค้า ID: ${id}`);
        }

        await this.productsRepository.update(id, data);

        const updated = await this.productsRepository.findOne({ where: { Product_Id: id } });
        if (!updated) throw new NotFoundException(`ไม่สามารถอัปเดตข้อมูลสินค้าได้`);
        return updated;
    }

    // ลบสินค้า
    async remove(id: number): Promise<void> {
        const existingProduct = await this.productsRepository.findOneBy({ Product_Id: id });
        if (!existingProduct) {
            throw new NotFoundException(`ไม่พบสินค้า ID : ${id}`);
        }
        await this.productsRepository.delete(id); // Ensure deletion is handled properly 
    }

}
