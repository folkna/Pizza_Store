import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Address{
    Address_Id : number,
    member: Member,
    Address_String : string,
    Address_Latitude: number,
    Address_Longitude: number,
}

interface Member{
    Mem_Id : string,
    Mem_Username : string,
    Mem_Status : string,
}

export interface PostAddress{
    Mem_Id : string,
    Address_String : string,
    Address_Latitude : number,
    Address_Longitude : number,
}

interface AddressState{
    Address : Address[],
    loading : boolean,
    error : string | null,
}

const initialState  : AddressState ={
    Address : [],
    loading: false,
    error : null
} 

const API_URL = "http://localhost:3000/addresses";
export const fetchAddressByMemberId = createAsyncThunk<Address[], number , {rejectValue : string}>( "addresses/fetchAddressByMemeberId", async (memberid , {rejectWithValue}) => {
        try{
            const response = await axios.get(`${API_URL}/member/${memberid}`)
            return response.data
        }
        catch (err: any) {
            return rejectWithValue("ดึงที่อยู่ไม่สำเร็จ");
        }
})


export const addAddress = createAsyncThunk<Address, PostAddress, {rejectValue : string}>("addresses/addAddress" , 
    async (data , {rejectWithValue}) => {
        try{
            const response = await axios.post(`${API_URL}`,data)
            return response.data
        }
        catch (err: any) {
            return rejectWithValue("เพิ่มที่อยู่ไม่สำเร็จ");
        }
})

export const deleteAddress = createAsyncThunk<number, number, {rejectValue : string}>("addresses/deleteAddress" , 
    async (id , {rejectWithValue}) => {
        try{
            await axios.delete(`${API_URL}/${id}`)
            return id;
        }
        catch (err: any) {
            return rejectWithValue("ลบที่อยู่ไม่สำเร็จ");
        }
})

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // 🟡 addAddress
    builder

      .addCase(fetchAddressByMemberId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressByMemberId.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.loading = false;
        state.Address = action.payload; 
      })

      .addCase(fetchAddressByMemberId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ดึงที่อยู่ไม่สำเร็จ";
      });

    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.loading = false;
        state.Address.push(action.payload); 
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "เพิ่มที่อยู่ไม่สำเร็จ";
      });

    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.Address = state.Address.filter(
          (addr) => addr.Address_Id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "ลบที่อยู่ไม่สำเร็จ";
      });
  },
});

export default addressSlice.reducer;