import { Controller, Post, Body, Get, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Category } from '../categories/categories.entity';
import { Employee } from 'src/employees/employees.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get("status")
  findAllByStatus(): Promise<Product[]>{
    return this.productsService.findAllByStatus();
  }

  @Get("/category/:category")
  findfromcategory(@Param('category') category : string) : Promise<Product[]>{
    return this.productsService.findCategory(category);
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('Product_Image', {
      storage: diskStorage({
        // เปลี่ยน destination เป็น folder picture
        destination: './picture',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@Body() body: any, @UploadedFile() image: any) {
    if (!body) throw new Error('Body is undefined');

    // สร้าง product data
    const productData: Partial<Product> = {
      Product_Name: body.Product_Name,
      category: { Category_Id: Number(body.Category_Id) } as Category,
      Product_Price: Number(body.Product_Price),
      Product_Status: body.Product_Status,
      Product_Quantity: Number(body.Product_Quantity),
      Product_Unitcost : Number(body.Product_Unitcost),
      Product_Image: image?.filename ? `/picture/${image.filename}` : null,
      employee: { Emp_Id: Number(body.Emp_Id) } as Employee,
    };

    // สร้าง record ใน database
    return this.productsService.create(productData as Product);
  }


  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './picture', // โฟลเดอร์เก็บไฟล์
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body() body: Partial<Product>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    if (file) {
      body.Product_Image = `/picture/${file.filename}`; // เก็บ path ลง DB
    }
    return this.productsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(Number(id));
  }
}

