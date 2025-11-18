import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./carts.entity";
import { Member } from "src/members/member.entity";
import { Address } from "src/addresses/addessess.entity";

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
        @InjectRepository(Member) private membersRepository: Repository<Member>,
        @InjectRepository(Address) private addressesRepository: Repository<Address>
    ) { }

    // Create: Add new Cart
    async create(body: any): Promise<Cart> {
        
        // หา member
        const member = await this.membersRepository.findOne({
            where: { Mem_Id: body.Mem_Id },
        });
        if (!member) throw new Error('ไม่พบข้อมูลสมาชิก');

        // สร้าง cart object
        const cartData: Partial<Cart> = {
            member,
            Cart_Sdate: new Date().toISOString(),
            Cart_Status: body.Cart_Status,
        };

        const cart = this.cartsRepository.create(cartData);

        return this.cartsRepository.save(cart);
    }

    // อัพเดตหรือสร้างตะกร้าใหม่
    async getOrCreateCart(memberId: string): Promise<Cart> {
        try {
            let cart = await this.cartsRepository.findOne({
                where: {
                    member: { Mem_Id: memberId },
                    Cart_Status: "รอการสั่งซื้อ"
                },
                relations: ["member", "address"],
                order: { Cart_Sdate: "DESC" },
            });

            if (!cart) {
                // ถ้าไม่เจอ → สร้างใหม่
                cart = this.cartsRepository.create({
                    member: { Mem_Id: memberId },
                    Cart_Sdate: new Date().toISOString(),
                    Cart_Status: "รอการสั่งซื้อ",
                });
                cart = await this.cartsRepository.save(cart);
            }

            return cart;
        } catch (error) {
            console.error("ไม่สามารถสร้างตะกร้าสินค้าได้:", error);
            throw error;
        }
    }

    // อัปเดตที่อยู่ในตะกร้า
    async updateCart(cartId: number, addressId: number): Promise<Cart> {
        const cart = await this.cartsRepository.findOne({
            where: { Cart_Id: cartId },
        });

        if (!cart) {
            throw new Error("ไม่พบข้อมูลตะกร้าสินค้า");
        }

        const address = await this.addressesRepository.findOne({
            where: { Address_Id: addressId },
        });

        if (!address) {
            throw new Error("ไม่พบข้อมูลที่อยู่");
        }

        cart.address = address;

        return this.cartsRepository.save(cart);
    }

}
