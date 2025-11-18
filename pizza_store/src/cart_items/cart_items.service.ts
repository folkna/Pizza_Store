import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart_Product } from './cart_items.entity';
import { Cart } from '../carts/carts.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(Cart_Product)
    private readonly cartProductsRepository: Repository<Cart_Product>,

    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) { }

  // ดึงรายการสินค้าในตะกร้า
  async getItemsCart(cartId: number): Promise<Cart_Product[]> {
    return this.cartProductsRepository.find({
      where: { cart: { Cart_Id: cartId } },
      relations: ['cart', 'product'],
    });
  }

  // ดึงรายการสินค้าเฉพาะ product ในตะกร้า
  async getItemsCartForMember(cartId: number, productId?: number): Promise<Cart_Product[]> {
    const where: any = { cart: { Cart_Id: cartId } };
    if (productId != null) where.product = { Product_Id: productId };

    return this.cartProductsRepository.find({
      where,
      relations: ['cart', 'product'],
    });
  }

  async addItemsCartForMember(
    cartId: number,
    body: { productId: number; quantity: number },
  ): Promise<Cart_Product> {
    const { productId, quantity } = body;

    if (!productId || quantity <= 0) {
      throw new Error('รหัสสินค้าและจำนวนต้องเป็นจำนวนเต็มบวก');
    }

    const cart = await this.cartsRepository.findOne({ where: { Cart_Id: cartId } });
    if (!cart) throw new Error('ไม่พบข้อมูลตะกร้าสินค้า');

    const product = await this.productsRepository.findOne({ where: { Product_Id: productId } });
    if (!product) throw new Error('ไม่พบข้อมูลสินค้า');

    // ถ้ามี product เดิมอยู่ในตะกร้า ให้บวก quantity แทนสร้างใหม่
    let cartProduct = await this.cartProductsRepository.findOne({
      where: { cart: { Cart_Id: cartId }, product: { Product_Id: productId } },
      relations: ['cart', 'product'],
    });

    if (cartProduct) {
      cartProduct.Cartproduct_Quantity += quantity;
    } else {
      cartProduct = this.cartProductsRepository.create({
        cart,
        product,
        Cartproduct_Quantity: quantity,
      });
    }

    return this.cartProductsRepository.save(cartProduct);
  }

  async updateItemsCartForMember(
    cartProductId: number,
    body: { quantity?: number; productId?: number },
  ): Promise<Cart_Product> {
    const { quantity, productId } = body;

    const cartProduct = await this.cartProductsRepository.findOne({
      where: { Cartproduct_Id: cartProductId },
      relations: ['product', 'cart'],
    });

    if (!cartProduct) throw new Error('ไม่พบข้อมูลสินค้าในตะกร้าสินค้า');

    // อัปเดต quantity
    if (quantity !== undefined) {
      if (quantity <= 0) {
        // ลบ item ถ้า quantity เป็น 0 หรือค่าลบ
        await this.cartProductsRepository.remove(cartProduct);
        throw new Error('จำนวนสั่งซื้อต้องเป็นจำนวนเต็มบวก');
      }
      cartProduct.Cartproduct_Quantity = quantity;
    }

    // อัปเดต product ถ้ามี
    if (productId !== undefined && cartProduct.product?.Product_Id !== productId) {
      const newProduct = await this.productsRepository.findOne({ where: { Product_Id: productId } });
      if (!newProduct) throw new Error('ไม่พบข้อมูลสินค้า');
      cartProduct.product = newProduct;
    }

    return this.cartProductsRepository.save(cartProduct);
  }

  // Delete: ลบสินค้าออกจากตะกร้า
  async deleteItemsCartForMember(cartProductId: number): Promise<void> {
    await this.cartProductsRepository.delete(cartProductId);
  }
}
