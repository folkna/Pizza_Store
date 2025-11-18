import { Routes, Route, BrowserRouter } from 'react-router';
import Home from './Frontend/Home';
import Login from './Frontend/Session/Login';
import ProtectedRoute from './Frontend/Session/ProtectedRoute';
import Address_Details from './Frontend/Address/Address_Details';
import Address from './Frontend/Address/Address';
import Order from './Frontend/Order';
import Employee_Login from './Dashboard/Session/Employee_Login';
import FrontendLayout from './Frontend/FrontendLayout';
import DashboardLayout from './Dashboard/DashboardLayout';
import Product_Dashboard from './Dashboard/Product/Product_Dashboard';
import Member_Dashboard from './Dashboard/Member/Member_Dashboard';
import Product_Update_Dashboard from './Dashboard/Product/Product_Update_Dashboard';
import Product_Add_Dashboard from './Dashboard/Product/Product_Add_Dashboard';
import ProtectedRouteEmployee from './Dashboard/Session/ProtectedRouteEmployee';
import Order_Dashboard from './Dashboard/Order/Order_Dashboard';
import Employee_Add_Dashboard from './Dashboard/Employee/Employee_Add_Dashboard';
import Employee_Dashboard from './Dashboard/Employee/Employee_Dashboard';
import Member_Account from './Frontend/Member_Account';
import Member_Order from './Frontend/Member_Order';
import Delivery_Dashboard from './Dashboard/Delivery/Delivery_Dashboard';
import Dashboard from './Dashboard/Dashboard';
import Employee_Update_Dashboard from './Dashboard/Employee/Employee_Update_Dashboard';
import Register from './Frontend/Session/Register';
import Member_Update_Dashboard from './Dashboard/Member/Member_Update_Dashboard';


const RoutingApp = () => {


    return (
        <BrowserRouter>
            <main className="flex flex-col jutify-center w-full bg-white">
                <Routes>
                    {/* Front-End */}
                    <Route element={<FrontendLayout />}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/Order" element={<ProtectedRoute><Order /></ProtectedRoute>}></Route>
                        <Route path="/Login" element={<Login />}></Route>
                        <Route path="/Register" element={<Register />}></Route>
                        <Route path="/Member_Account" element={<ProtectedRoute><Member_Account /></ProtectedRoute>}></Route>
                        <Route path="/Member_Order" element={<ProtectedRoute><Member_Order /></ProtectedRoute>}></Route>
                        <Route path="/Address" element={<ProtectedRoute><Address_Details /></ProtectedRoute>}></Route>
                        <Route path="/Address_Select" element={<ProtectedRoute><Address /></ProtectedRoute>}></Route>
                    </Route>

                    {/* Dashboard */}
                    <Route element={<DashboardLayout />}>
                        <Route path="/Dashboard" element={<ProtectedRouteEmployee><Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Product" element={<ProtectedRouteEmployee><Product_Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Product_Update/:id" element={<ProtectedRouteEmployee><Product_Update_Dashboard /></ProtectedRouteEmployee>} />
                        <Route path="/Dashboard/Product_Add" element={<ProtectedRouteEmployee><Product_Add_Dashboard /></ProtectedRouteEmployee>} />
                        <Route path="/Dashboard/Delivery" element={<ProtectedRouteEmployee><Delivery_Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Employee" element={<ProtectedRouteEmployee><Employee_Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Employee_Add" element={<ProtectedRouteEmployee><Employee_Add_Dashboard /></ProtectedRouteEmployee>} />
                        <Route path="/Dashboard/Employee_Update/:id" element={<ProtectedRouteEmployee><Employee_Update_Dashboard /></ProtectedRouteEmployee>} />
                        <Route path="/Dashboard/Order" element={<ProtectedRouteEmployee><Order_Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Member" element={<ProtectedRouteEmployee><Member_Dashboard /></ProtectedRouteEmployee>}></Route>
                        <Route path="/Dashboard/Member_Update/:id" element={<ProtectedRouteEmployee><Member_Update_Dashboard /></ProtectedRouteEmployee>}></Route>
                    </Route>
                    <Route path="/Employee_Login" element={<Employee_Login />}></Route>
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default RoutingApp;