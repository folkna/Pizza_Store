import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Read: Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  // Read: Get one category by id
  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ Category_Id : id });
    if (!category) {
      throw new NotFoundException(`ไม่พบข้อมูลประเภทสินค้า ID : ${id}`);
    }
    return category;
  }

  // Create: Add new category
  async create(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }

  // Update: Edit category by id
  async update(id: number, category: Partial<Category>): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findOneBy({ Category_Id : id });
    if (!existingCategory) {
      throw new NotFoundException(`ไม่พบข้อมูลประเภทสินค้า ID : ${id}`);
    }
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOneBy({ Category_Id : id });
    if (!updatedCategory) {
      throw new NotFoundException(`ไม่สามารถอัปเดตข้อมูลประเภทสินค้าได้`);
    }
    return updatedCategory;
  }

  // Delete: Remove category by id
  async remove(id: number): Promise<void> {
    const existingCategory = await this.categoriesRepository.findOneBy({ Category_Id : id });
    if (!existingCategory) {
      throw new NotFoundException(`ไม่พบข้อมูลประเภทสินค้า ID : ${id}`);
    }
    await this.categoriesRepository.delete(id);
  }
}
