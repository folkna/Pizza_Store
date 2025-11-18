import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Employee {
    Emp_Id: number;
    Emp_Fname: string;
    Emp_Lname: string;
    Emp_Role: string;
}

interface Category {
    Category_Id: number;
    Category_Name: string;
    Category_Desc: string,
}

export interface Product {
    Product_Id: number;
    Product_Name: string;
    employee: Employee;
    category: Category;
    Product_Price: number;
    Product_Cost: number;
    Product_Desc: string;
    Product_Quantity: number;
    Product_Status: string;
    Product_Unitcost: number,
    Product_Image: string;
}

interface ProductState {
    Product: Product[];
    Productforupdate: null | Product,
    Category: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    Product: [],
    Productforupdate: null,
    Category: [],
    loading: false,
    error: null,
};

export interface ForUpdateQuantityProduct {
    Product_Id: number,
    Product_Quantity: number
}

const API_URL = "http://localhost:3000/products";
const API_URL_CATEGORY = "http://localhost:3000/categories";
// ดึงข้อมูลทั้งหมด
export const fetchAll = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "product/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("ไม่สามารถโหลดสินค้าได้");
        }
    }
);

// ดึงสินค้าตามรหัสสินค้า
export const fetchproductbyid = createAsyncThunk<Product, { id: string }, { rejectValue: string }>(
    "product/fetchproductbyid",
    async ({ id }, { rejectWithValue }) => {   // <-- ต้อง destructure
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("ไม่สามารถโหลดสินค้าได้");
        }
    }
);

// ลบสินค้า
export const removeProduct = createAsyncThunk<number, number, { rejectValue: string }>(
    "product/removeProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue("ลบสินค้าไม่สำเร็จ");
        }
    }
);

// อัพเดตสินค้า
export const updateProduct = createAsyncThunk<Product, { Product_Id: number; formData: FormData }, { rejectValue: string }>(
    "product/updateProduct",
    async ({ Product_Id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${Product_Id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // จำเป็นสำหรับ FormData
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue("อัพเดตสินค้าไม่สำเร็จ");
        }
    }
);

// เพิ่มสินค้า
export const addProduct = createAsyncThunk<Product, FormData, { rejectValue: string }>(
    "product/addProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue("เพิ่มสินค้าไม่สำเร็จ");
        }
    }
);

// ดึงสินค้าตาม category
export const fetchByCategory = createAsyncThunk<Product[], string, { rejectValue: string }>(
    "product/fetchByCategory",
    async (category, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/category/${category}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("โหลดสินค้าตามหมวดหมู่ไม่สำเร็จ");
        }
    }
);

// ดึงหมวดหมู่สินค้า
export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
    "product/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL_CATEGORY);
            return response.data;
        } catch (err: any) {
            return rejectWithValue("โหลดข้อมูลหมวดหมู่ไม่สำเร็จ");
        }
    }
);

// อัพเดตจำนวนสินค้า
export const updateProductQuantity = createAsyncThunk<Product, { productId: number; formData: FormData }, { rejectValue: string }>(
    "product/updateProductQuantity",
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue("อัพเดตจำนวนสินค้าไม่สำเร็จ");
        }
    }
);

// ดึงสินค้าตามสถานะ
export const fetchProductsbyStatus = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "product/fetchproductsbystatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/status`);
            return response.data;
        }
        catch (err: any) {
            return rejectWithValue("โหลดข้อมูลสินค้าไม่สำเร็จ");
        }
    }
);

// --- Slice ---
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAll.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAll.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.Product = action.payload;
            })
            .addCase(fetchAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })

            .addCase(fetchproductbyid.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchproductbyid.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.Productforupdate = action.payload;
            })
            .addCase(fetchproductbyid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(removeProduct.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.Product = state.Product.filter(p => p.Product_Id !== action.payload);
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(updateProduct.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                const index = state.Product.findIndex(p => p.Product_Id === action.payload.Product_Id);
                if (index !== -1) state.Product[index] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(addProduct.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.Product.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(fetchByCategory.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.Product = action.payload;
            })
            .addCase(fetchByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "เกิดข้อผิดพลาด";
            })
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.Category = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "เกิดข้อผิดพลาด";
            })
            .addCase(fetchProductsbyStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsbyStatus.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.Product = action.payload;
            })
            .addCase(fetchProductsbyStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "เกิดข้อผิดพลาด";
            })
            .addCase(updateProductQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductQuantity.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                const index = state.Product.findIndex(p => p.Product_Id === action.payload.Product_Id);
                if (index !== -1) state.Product[index] = action.payload;
            })
            .addCase(updateProductQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "เกิดข้อผิดพลาด";
            });
    },
});

export default productSlice.reducer;
