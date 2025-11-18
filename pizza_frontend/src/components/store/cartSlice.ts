import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    Cartproduct_Id: number;
    Cartproduct_Quantity: number;
    product: Product;
}

interface Product {
    Product_Id: number,
    Product_Name: string,
    Product_Price: number,
    Product_Cost: number,
    Product_Quantity: number,
    Product_Status: string,
    Product_Image: string,
}

interface CartState {
    Cart: CartMember | null,
    cartItems: CartItem[];
    loading: boolean;
    error: string | null;
}

interface CartMember {
    Cart_Id: number,
    member: Member,
    address: Address,
}

interface Member {
    Mem_Id: string,
    Mem_Fname: string,
    Mem_Lname: string,
}

interface Address {
    Address_Id: number,
    Address_String: String
}

const initialState: CartState = {
    Cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const API_URL = "http://localhost:3000/carts";
const API_URL_ITEMS = "http://localhost:3000/cart-items";

// เพิ่มสินค้าลงตะกร้า
export const addToCart = createAsyncThunk<
    CartItem, // return type
    { id: number; memberId: string }, // argument type
    { rejectValue: string }
>("cart/addToCart", async ({ id, memberId }, { rejectWithValue }) => {
    try {
        // ดึง cart ของสมาชิก
        const { data: cart } = await axios.get(
            `${API_URL}/${memberId}`,
            { withCredentials: true }
        );

        // ตรวจสอบว่ามีสินค้านี้ใน cart หรือไม่
        const { data: cartItems } = await axios.get(
            `${API_URL_ITEMS}?cartId=${cart.Cart_Id}&productId=${id}`,
            { withCredentials: true }
        );

        if (cartItems.length > 0) {
            // มีอยู่แล้ว => update quantity
            const currentItem = cartItems[0];
            const maxQuantity = currentItem.product.Product_Quantity;

            if (currentItem.Cartproduct_Quantity + 1 > maxQuantity) {
                return rejectWithValue("ไม่สามารถเพิ่มสินค้าเกินจำนวนที่มีได้");
            }

            const { data: updatedItem } = await axios.put(
                `${API_URL_ITEMS}/${currentItem.Cartproduct_Id}`,
                { quantity: currentItem.Cartproduct_Quantity + 1 },
                { withCredentials: true }
            );

            return updatedItem as CartItem;
        } else {
            // ยังไม่มี => เพิ่มใหม่
            const payload = { productId: id, quantity: 1 };
            const { data: newItem } = await axios.post(
                `${API_URL_ITEMS}/${cart.Cart_Id}`,
                payload,
                { withCredentials: true }
            );

            return newItem as CartItem;
        }
    } catch (error: any) {
        console.error(error);
        return rejectWithValue("เกิดข้อผิดพลาดในการเพิ่มข้อมูลลงรถเข็น");
    }
});

// ดึงตะกร้าล่าสุดของสมาชิก
export const findLatestCart = createAsyncThunk<
    { Cart: any },
    { memberId: string },
    { rejectValue: string }
>(
    "cart/findLatestCart",
    async ({ memberId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${memberId}`);

            if (!response.data || !response.data.Cart_Id) {
                return rejectWithValue("เกิดข้อผิดพลาด ไม่พบข้อมูลตะกร้า");
            }

            return { Cart: response.data };
        } catch (error) {
            return rejectWithValue("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        }
    }
);

// ดึงสินค้าที่อยู่ในตะกร้า
export const fetchItemsCart = createAsyncThunk<
    { CartItems: any },
    { cartId: number },
    { rejectValue: string }
>("cart/fetchItemsCart", async ({ cartId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_ITEMS}/${cartId}`);
        if (!response.data) {
            return rejectWithValue("เกิดข้อผิดพลาด ไม่พบข้อมูลสินค้าในตะกร้า");
        }

        return { CartItems: response.data }
    }
    catch (error) {
        return rejectWithValue("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
});

// อัปเดตจำนวนสินค้าที่อยู่ในตะกร้า
export const updateCartItemQuantity = createAsyncThunk<
    CartItem, // return type
    { id: number; newQuantity: number },
    { rejectValue: string }
>(
    "cart/updateCartItemQuantity",
    async ({ id, newQuantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL_ITEMS}/${id}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue("ไม่สามารถอัปเดตจำนวนสินค้าได้");
        }
    }
);


// อัปเดตที่อยู่ตะกร้า
export const updateCartAddress = createAsyncThunk<
    { Cart: any }, 
    { cartId: number; addressId: number }, 
    { rejectValue: string }
>(
    "cart/updateCartAddress",
    async ({ cartId, addressId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${cartId}`,
                { addressId },
                { withCredentials: true } 
            );

            return { Cart: response.data }; 
        } catch (error: any) {
            return rejectWithValue("ไม่สามารถอัปเดตที่อยู่ตะกร้าได้");
        }
    }
);

// ลบสินค้าออกจากตะกร้า
export const removeCartItem = createAsyncThunk<
    number,
    { id: number; },
    { rejectValue: string }
>(
    "cart/removeCartItem",
    async ({ id }, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL_ITEMS}/${id}`, { withCredentials: true });
            return id;
        } catch (error) {
            return rejectWithValue("ไม่สามารถลบสินค้าได้");
        }
    }
);

// --- Slice ---
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addToCart.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.loading = false;

                const index = state.cartItems.findIndex(
                    (item) => item.Cartproduct_Id === action.payload.Cartproduct_Id
                );

                if (index >= 0) {
                    // มีอยู่แล้ว => update quantity
                    state.cartItems[index] = action.payload;
                } else {
                    // ยังไม่มี => push ใหม่
                    state.cartItems.push(action.payload);
                }
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(findLatestCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findLatestCart.fulfilled, (state, action: PayloadAction<{ Cart: any }>) => {
                state.loading = false;
                state.Cart = action.payload.Cart
            })
            .addCase(findLatestCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchItemsCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemsCart.fulfilled, (state, action: PayloadAction<{ CartItems: any }>) => {
                state.loading = false;
                state.cartItems = action.payload.CartItems
            })
            .addCase(fetchItemsCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.loading = false;

                const index = state.cartItems.findIndex(
                    (item) => item.Cartproduct_Id === action.payload.Cartproduct_Id
                );
                if (index !== -1) {
                    state.cartItems[index] = action.payload;
                }
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(item => item.Cartproduct_Id !== action.payload);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
        builder
            .addCase(updateCartAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartAddress.fulfilled, (state, action: PayloadAction<{ Cart: any }>) => {
                state.loading = false;
                state.Cart = action.payload.Cart; // อัปเดต cart ใน state
            })
            .addCase(updateCartAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ";
            });
    }
})

export default cartSlice.reducer;