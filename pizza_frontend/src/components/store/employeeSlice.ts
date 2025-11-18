import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// --- Interfaces ---
export interface Employee {
    Emp_Id: number;
    Emp_Fname: string;
    Emp_Lname: string;
    Emp_Hnumber: string;
    Emp_Alley: string;
    Emp_Village: string;
    Emp_Street: string;
    Emp_District: string;
    Emp_Subdistrict: string;
    Emp_Province: string;
    Emp_Poscode: string,
    Emp_Tel: string;
    Emp_Email: string;
    Emp_Workyear: number;
    Emp_Role: string,
    Emp_Salary: number,
    Emp_Status: string;
    Emp_Username: string;
    Emp_Password: string;
}

export interface EmployeeForm {
    Emp_Fname: string;
    Emp_Lname: string;
    Emp_Hnumber: string;
    Emp_Alley: string;
    Emp_Village: string;
    Emp_Street: string;
    Emp_District: string;
    Emp_Subdistrict: string;
    Emp_Province: string;
    Emp_Poscode: string,
    Emp_Tel: string;
    Emp_Email: string;
    Emp_Workyear: number;
    Emp_Role: string,
    Emp_Salary: number,
    Emp_Status: string;
    Emp_Username: string;
    Emp_Password: string;
}

// --- State ---
interface EmployeeState {
    employeeAll: Employee[];
    employee: Employee | null;
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employeeAll: [],
    employee: null,
    loading: false,
    error: null,
};

const API_URL = "http://localhost:3000/employees";
// เพิ่มพนักงาน
export const addEmployee = createAsyncThunk<Employee, EmployeeForm, { rejectValue: string }>(
    "employee/addEmployee",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (err: any) {
            if (err.response?.status === 500) {
                return rejectWithValue(err.response.data.message || "ชื่อผู้ใช้นี้ถูกใช้แล้ว");
            }
            return rejectWithValue("เพิ่มพนักงานไม่สำเร็จ");
        }
    }
);

// ดึงข้อมูลพนักงานทั้งหมด
export const findEmployeeAll = createAsyncThunk<Employee[], void, { rejectValue: string }>(
    "employee/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch {
            return rejectWithValue("โหลดข้อมูลพนักงานไม่สำเร็จ");
        }
    }
);

// ดึงข้อมูลพนักงานตามรหัสพนักงาน
export const fetchEmployee = createAsyncThunk<Employee, number, { rejectValue: string }>(
    "employee/fetchOne",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch {
            return rejectWithValue("ไม่พบข้อมูลพนักงาน");
        }
    }
);

// อัปเดตข้อมูลพนักงาน
export const updateEmployee = createAsyncThunk<Employee, Employee, { rejectValue: string }>(
    "employee/update",
    async (employee, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${employee.Emp_Id}`,
                employee
            );
            return response.data;
        } catch (err: any) {
            if (err.response?.status === 409) {
                return rejectWithValue("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
            }
            return rejectWithValue("อัปเดตข้อมูลพนักงานไม่สำเร็จ");
        }
    }
);

// --- Slice ---
export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addEmployee.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.loading = false;
                state.employeeAll.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(findEmployeeAll.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findEmployeeAll.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.loading = false;
                state.employeeAll = action.payload;
            })
            .addCase(findEmployeeAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(fetchEmployee.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(updateEmployee.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.loading = false;
                const index = state.employeeAll.findIndex(e => e.Emp_Id === action.payload.Emp_Id);
                if (index !== -1) {
                    state.employeeAll[index] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            });
    },
});

export default employeeSlice.reducer;
