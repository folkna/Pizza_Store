import { Controller, Get, Post, Put, Delete, Param, Body, } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get() //Get /products - Get all
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id') // GET /products/:id - Get one 
    findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(parseInt(id));
    }

    @Post() // POST /products - Create 
    create(@Body() product: Category): Promise<Category> {
        return this.categoriesService.create(product);
    }

    @Put(':id') // PUT /products/:id - Update 
    update(@Param('id') id: string, @Body()  product : Category): Promise<Category> {
        return this.categoriesService.update(parseInt(id), product);
    }

    @Delete(':id') // DELETE /products/:id - Delete 
    remove(@Param('id') id: string): Promise<void> {
        return this.categoriesService.remove(parseInt(id));
    }
}
