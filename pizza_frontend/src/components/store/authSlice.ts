import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Member_Login {
  memberId?: string,
  memberName?: string,
  loggedIn: boolean
}


interface Login {
  member: Member_Login | null,
  loading: boolean,
  error: null | string
}

const initialState: Login = {
  member: null,
  loading: false,
  error: null,
}

const API_URL = "http://localhost:3000/members";
// ดึงข้อมูลการล็อกอิน
export const fetchLogin = createAsyncThunk<
  Member_Login,
  void,
  { rejectValue: string }
>(
  "login/fetchLogin",
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

// เข้าสู่ระบบ
export const Loginstore = createAsyncThunk<
  Member_Login,
  { identifier: string; password: string },
  { rejectValue: string }
>(
  "login/Loginstore",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        {
          identifier: body.identifier,
          password: body.password,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้"
      );
    }
  }
);

// ออกจากระบบ
export const Logout = createAsyncThunk<
  Member_Login,
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
const memberSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<Member_Login>) => {
          state.loading = false;
          state.member = action.payload;
        }
      )
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถดึงข้อมูล Login ได้";
      })

      .addCase(Loginstore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Loginstore.fulfilled, (state, action: PayloadAction<Member_Login>) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(Loginstore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถเข้าสู่ระบบได้";
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state, action: PayloadAction<Member_Login>) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ไม่สามารถออกสู่ระบบได้";
      });
  },
});



export default memberSlice.reducer;

