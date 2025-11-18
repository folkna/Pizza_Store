import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { addProduct, fetchCategories } from "../../store/productSlice";

const Product_Add_Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState(199);
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [unitcost, setUnitcost] = useState(25);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Error state
    const [errName, setErrName] = useState(false);
    const [errPrice, setErrPrice] = useState(false);
    const [errQuantity, setErrQuantity] = useState(false);
    const [errStatus, setErrStatus] = useState(false);
    const [errunitcost, setErrunitcost] = useState(false);
    const [errCategory, setErrCategory] = useState(false);

    // Categories from store
    const categories = useSelector((state: RootState) => state.product.Category);
    const employee = useSelector((state: RootState) => state.authemp.employee)

    // ดึงหมวดหมู่สินค้า
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // ฟังก์ชันจัดการการส่งฟอร์ม
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        let hasError = false;

        if (!name.trim()) {
            setErrName(true); hasError = true;
        }
        else setErrName(false);
        if (isNaN(price) || price < 0) { setErrPrice(true); hasError = true; }
        else setErrPrice(false);
        if (isNaN(quantity) || quantity < 0) { setErrQuantity(true); hasError = true; }
        else setErrQuantity(false);
        if (!status.trim()) { setErrStatus(true); hasError = true; }
        else setErrStatus(false);
        if (!category.trim()) { setErrCategory(true); hasError = true; }
        else setErrCategory(false);

        if (hasError) return;

        try {
            const formData = new FormData();
            formData.append("Product_Name", name);
            formData.append("Product_Price", String(price));
            formData.append("Product_Quantity", String(quantity));
            formData.append("Product_Status", status);
            formData.append("Product_Unitcost", String(unitcost))
            formData.append("Category_Id", category);

            if (imageFile) formData.append("Product_Image", imageFile);
            formData.append("Emp_Id", String(employee?.employeeId))

            const action = await dispatch(addProduct(formData));

            if (addProduct.fulfilled.match(action)) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'เพิ่มข้อมูลสินค้าเรียบร้อย',
                    timer: 2000,
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                    timerProgressBar: true,
                    willClose: (() => navigate("/Dashboard/Product"))
                })
            } else if (addProduct.rejected.match(action)) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: action.payload || 'ไม่สามารถเพิ่มสินค้าได้',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                });
            }
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
            });
        }
    }

    return (
        <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
            <main className="flex flex-col w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                <p className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8">
                    เพิ่มสินค้าใหม่
                </p>

                <form className="flex flex-col gap-6 w-full" onSubmit={handlesubmit}>

                    {/* Name */}
                    <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            ชื่อสินค้า
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="กรอกชื่อสินค้า"
                            value={name}
                            maxLength={150}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                ${errName ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                        />
                        {errName && <p className="text-red-500 text-xs mt-1">กรุณากรอกชื่อสินค้า</p>}
                    </div>

                    {/* Price */}
                    <div className="w-full">
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">ราคา</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="กรอกราคา"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                ${errPrice ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                        />
                        {errPrice && <p className="text-red-500 text-xs mt-1">กรุณากรอกราคา</p>}
                    </div>

                    {/* Unitcost */}
                    <div className="w-full">
                        <label htmlFor="unitcost" className="block text-sm font-medium text-slate-700 mb-2">
                            ราคาต่อชิ้น
                        </label>
                        <input
                            id="unitcost"
                            type="number"
                            placeholder="กรอกราคาต้นทุนต่อชิ้น"
                            value={unitcost}
                            onChange={(e) => setUnitcost(Number(e.target.value))}
                            onBlur={() => setErrunitcost(false)}
                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                  ${errunitcost ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`} />
                        {errunitcost && (
                            <p className="text-red-500 text-xs mt-1">กรุณากรอกราคาต้นทุนต่อชิ้น</p>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="w-full">
                        <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">จำนวน</label>
                        <input
                            id="quantity"
                            type="number"
                            placeholder="กรอกจำนวนสินค้า"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            onBlur={() => setErrQuantity(false)}
                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                ${errQuantity ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                        />
                        {errQuantity && <p className="text-red-500 text-xs mt-1">กรุณากรอกจำนวนสินค้า</p>}
                    </div>

                    {/* Status */}
                    <div className="w-full">
                        <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">สถานะสินค้า</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            onBlur={() => setErrStatus(false)}
                            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 bg-white
                                ${errStatus ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                        >
                            <option value="">-- เลือกสถานะสินค้า --</option>
                            <option value="ปกติ">ปกติ</option>
                            <option value="ไม่พร้อมทำการ">ไม่พร้อมทำการ</option>
                        </select>
                        {errStatus && <p className="text-red-500 text-xs mt-1">กรุณาเลือกสถานะสินค้า</p>}
                    </div>

                    {/* Category */}
                    <div className="w-full">
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">หมวดหมู่สินค้า</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white
                                ${errCategory ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                        >
                            <option value="">-- เลือกหมวดหมู่สินค้า --</option>
                            {/* ดึงหมวดหมู่มาแสดง */}
                            {categories.map((cat) => (
                                <option key={cat.Category_Id} value={cat.Category_Id}>
                                    {cat.Category_Name}
                                </option>
                            ))}
                        </select>
                        {errCategory && <p className="text-red-500 text-xs mt-1">กรุณาเลือกหมวดหมู่</p>}
                    </div>

                    {/* Image */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-2">รูปภาพสินค้า</label>
                        <div className="mb-4">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-lg border border-dashed border-slate-300 flex items-center justify-center">
                                    <p className="text-sm text-slate-500">ไม่มีรูปภาพ</p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImageFile(e.target.files[0]);
                                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-red-50 file:text-red-700
                            hover:file:bg-red-100"
                        />
                    </div>

                    {/* ปุ่มเพิ่มสินค้า */}
                    <button
                        type="submit"
                        className="mt-6 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 
                        text-white rounded-lg shadow-md duration-300 font-semibold
                        focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                    >
                        เพิ่มสินค้า
                    </button>
                </form>
            </main>
        </section>
    );
};

export default Product_Add_Dashboard;
