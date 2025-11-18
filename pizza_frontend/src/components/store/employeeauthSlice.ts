import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Employee_Login {
  employeeId?: number,
  employeeName?: string,
  loggedIn: boolean
}


interface Login {
  employee: Employee_Login | null,
  loading: boolean,
  error: null | string
}

const initialState: Login = {
  employee: null,
  loading: false,
  error: null,
}

const API_URL = "http://localhost:3000/employees";
// ดึงข้อมูลการล็อกอินพนักงาน
export const fetchLoginemployee = createAsyncThunk<
  Employee_Login,
  void,
  { rejectValue: string }
>(
  "login/fetchLoginemployee",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue("ไม่สามารถดึงข้อมูล Login ได้");
    }
  }
);

// เข้าสู่ระบบพนักงาน
export const Loginemployeestore = createAsyncThunk<
  Employee_Login,
  { identifier: string; password: string },
  { rejectValue: string }
>(
  "login/Loginemployeestore",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        body,
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้",
      );
    }
  }
);

// ออกจากระบบพนักงาน
export const Logout = createAsyncThunk<
  Employee_Login,
  void,
  { rejectValue: string }
>(
  "login/Logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "ไม่สามารถออกสู่ระบบได้"
      );
    }
  }
);


// --- Slice ---
const employeeSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginemployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLoginemployee.fulfilled,
        (state, action: PayloadAction<Employee_Login>) => {
          state.loading = false;
          state.employee = action.payload;
        }
      )
      .addCase(fetchLoginemployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถดึงข้อมูล Login ได้";
      })

      .addCase(Loginemployeestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Loginemployeestore.fulfilled, (state, action: PayloadAction<Employee_Login>) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(Loginemployeestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถออกสู่ระบบได้";
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state, action: PayloadAction<Employee_Login>) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถออกสู่ระบบได้";
      })
  },
});


export default employeeSlice.reducer;

