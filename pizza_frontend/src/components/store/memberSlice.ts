import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Member {
    Mem_Id: string,
    Mem_Fname: string,
    Mem_Lname: string,
    Mem_Email: string,
    Mem_Tel: string,
    Mem_Sdate: Date,
    Mem_Status: string,
    Mem_Username: string,
    Mem_Password: string,
}

export interface MemberForm {
    Mem_Id: string;
    Mem_Fname?: string;
    Mem_Lname?: string;
    Mem_Email?: string;
    Mem_Tel?: string;
    Mem_Status?: string;
    Mem_Password?: string;
}

export interface registerform {
    Mem_Fname: string,
    Mem_Lname: string,
    Mem_Email: string,
    Mem_Tel: string,
    Mem_Username: string,
    Mem_Password: string
}

interface MemberState {
    MemberAll: Member[],
    Member: Member | null,
    loading: boolean,
    error: string | null
}

const initialState: MemberState = {
    MemberAll: [],
    Member: null,
    loading: false,
    error: null
}

const API_URL = "http://localhost:3000/members";
// การสมัครสมาชิก
export const register = createAsyncThunk<Member, registerform, { rejectValue: string }>(
    "member/register", async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (err: any) {
            if (err.response?.status === 409) {
                return rejectWithValue("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
            }
            return rejectWithValue("ไม่สามารถสมัครสมาชิกได้");
        }
    }
);

// อัปเดตข้อมูลสมาชิก
export const updateMember = createAsyncThunk<Member, MemberForm, { rejectValue: string }>(
    "member/updatemember", async (member, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${member.Mem_Id}`, member)
            return response.data;
        }
        catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้",
            );
        }
    }
)

// ดึงสมาชิกทั้งหมด
export const findMemberAll = createAsyncThunk<Member[], void, { rejectValue: string }>(
    "member/findAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("โหลดข้อมูลสมาชิกไม่สำเร็จ");
        }
    }
);

// ดึงสมาชิกตามรหัสสมาชิก
export const findMember = createAsyncThunk<
    Member,
    { memberId: string },
    { rejectValue: string }
>(
    "member/findMember",
    async ({ memberId }, { rejectWithValue }) => { // <-- destructure จาก object
        try {
            const response = await axios.get(`${API_URL}/${memberId}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("โหลดข้อมูลสมาชิกไม่สำเร็จ");
        }
    }
);

// --- Slice ---
export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<Member>) => {
                state.loading = false;
                state.MemberAll.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(updateMember.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.loading = false;
                state.Member = action.payload;
                const index = state.MemberAll.findIndex(m => m.Mem_Id === action.payload.Mem_Id);
                if (index !== -1) {
                    state.MemberAll[index] = action.payload;
                }
            })
            .addCase(updateMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(findMemberAll.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findMemberAll.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.loading = false;
                state.MemberAll = action.payload;
            })
            .addCase(findMemberAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(findMember.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.loading = false;
                state.Member = action.payload;
            })
            .addCase(findMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            });
    }
})

export default memberSlice.reducer;
