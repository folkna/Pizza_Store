import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import memberReducer from './memberSlice'
import AuthReducer from './authSlice';
import CartReducer from './cartSlice';
import AddressReducer from './addressSlice';
import OrderReducer from './orderSlice';
import AuthEmpReducer from './employeeauthSlice';
import EmployeeReducer from './employeeSlice'
import DeliveryReducer from './deliverySlice';

export const store =  configureStore({
    reducer: {
        product: productReducer,
        member: memberReducer,
        auth: AuthReducer,
        cart: CartReducer,
        address : AddressReducer,
        order: OrderReducer,
        authemp: AuthEmpReducer,
        employee: EmployeeReducer,
        delivery: DeliveryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
