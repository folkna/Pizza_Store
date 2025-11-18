import { createAsyncThunk, type PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Delivery {
    Delivery_Id: number;
    Delivery_Number: string;
    Delivery_Status: string;
    Delivery_Desc: string;
    order: Order;
}

interface Order {
    Order_Id: number;
    Order_Address: string;
    member : Member;
}

interface Member {
    Mem_Id: string;
    Mem_Fname: string;
    Mem_Lname: string;
}

interface DeliveryState {
    deliveries: Delivery[];
    loading: boolean;
    error: string | null;
}

const initialState: DeliveryState = {
    deliveries: [],
    loading: false,
    error: null,
};

const API_URL = "http://localhost:3000/deliveries";
// ดึงข้อมูลการจัดส่งตามรหัสสมาชิก
export const fetchDeliveriesByMemberId = createAsyncThunk<
    Delivery[],
    {memberId : string},
    { rejectValue: string }
>("deliveries/fetchByMemberId", async ({memberId}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/member/${memberId}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("ไม่สามารถดึงข้อมูลการจัดส่งได้");
        }
    }
);

// สร้างข้อมูลการจัดส่ง
export const createDelivery = createAsyncThunk<
    Delivery,
    { orderId: number; },
    { rejectValue: string }
    >("deliveries/createDelivery", async ({ orderId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, {
                orderId,
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue("สร้างข้อมูลการจัดส่งไม่สำเร็จ");
        }
    });

// ดึงข้อมูลการจัดส่งทั้งหมด
export const fetchDeliveryAll = createAsyncThunk<
    Delivery[],
    {},
    { rejectValue: string }
>("deliveries/fetchDeliveryAll", async ({},{ rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("ไม่สามารถดึงข้อมูลการจัดส่งได้");
        }
    });

// --- Slice ---
const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveriesByMemberId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveriesByMemberId.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
                state.loading = false;
                state.deliveries = action.payload;
            })
            .addCase(fetchDeliveriesByMemberId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(createDelivery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDelivery.fulfilled, (state, action: PayloadAction<Delivery>) => {
                state.loading = false;
                state.deliveries.push(action.payload);
            })
            .addCase(createDelivery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(fetchDeliveryAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeliveryAll.fulfilled, (state, action: PayloadAction<Delivery[]>) => {
                state.loading = false;
                state.deliveries = action.payload;
            })
            .addCase(fetchDeliveryAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            });
    },
});

export default deliverySlice.reducer;