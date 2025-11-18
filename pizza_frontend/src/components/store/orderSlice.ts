import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Order {
  Order_Id: number,
  cart: Cart,
  member: Member,
  Order_Amount: number,
  Order_Status: string,
  Order_Date: Date,
  Order_Address: string,
  delivery: Delivery,
}

interface Delivery {
  Delivery_Id: number,
  Delivery_Number: string,
  Delivery_Status: string,
}

interface Cart {
  Cart_Id: number;
  Cart_Status: string;
  cart_products: CartProduct[];
}

interface CartProduct {
  Cartproduct_Id: number;
  Cartproduct_Quantity: number;
  product: Product | null;
}

interface Product {
  Product_Id: number;
  Product_Name: string;
  Product_Price: number;
  Product_Quantity: number;
}

interface Member {
  Mem_Id: number,
  Mem_Fname: string,
  Mem_Lname: string
}

export interface PostOrder {
  cartId: number,
  memberId: string,
  order_amount: number,
  order_address: string,
}


interface OrderState {
  Order: Order[],
  loading: boolean,
  error: string | null,
}

const initialState: OrderState = {
  Order: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3000/orders";
// ดึง Order ของสมาชิกตามรหัสสมาชิก
export const getOrdersByMemberId = createAsyncThunk<
  Order[],
  {memberId : string},
  { rejectValue: string }
>("orders/getByMemberId", async ({memberId}, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/member/${memberId}`);
    return res.data;
  } catch {
    return rejectWithValue("ไม่สามารถดึงข้อมูล order ของสมาชิกได้");
  }
});

// ดึงคำสั่งซื้อทั้งหมด
export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchOrders", async (_,{ rejectWithValue }) => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch {
    return rejectWithValue("ไม่สามารถดึงข้อมูล order ได้");
  }
});

// ดึงคำสั่งซื้อตามสถานะ
export const getOrdersByStatus = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("orders/getByStatus", async (status, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/status/${status}`);
    return res.data;
  } catch {
    return rejectWithValue("ไม่สามารถดึงข้อมูล order ตามสถานะได้");
  }
});

// สร้างคำสั่งซื้อ
export const createOrder = createAsyncThunk<
  Order,
  PostOrder,
  { rejectValue: string }
>("orders/createOrder", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch {
    return rejectWithValue("สร้าง order ไม่สำเร็จ");
  }
});

// --- Slice ---
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersByMemberId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrdersByMemberId.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.Order = action.payload;
    });
    builder.addCase(getOrdersByMemberId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "ไม่สามารถดึงข้อมูลได้";
    });

    builder.addCase(getOrdersByStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrdersByStatus.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.Order = action.payload;
    });
    builder.addCase(getOrdersByStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "ไม่สามารถดึงข้อมูลได้";
    });

    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.Order.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "สร้าง order ไม่สำเร็จ";
    });
    
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.Order = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "สร้าง order ไม่สำเร็จ";
    });
  },
});

export default ordersSlice.reducer;