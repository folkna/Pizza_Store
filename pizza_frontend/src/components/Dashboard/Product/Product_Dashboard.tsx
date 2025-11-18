
import { FaCheck, FaEdit, FaTrash, FaTimes, FaTag, FaListAlt, FaDollarSign, FaBoxes, FaCheckCircle, FaCoins, FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll, removeProduct, fetchCategories, updateProductQuantity } from '../../store/productSlice';
import type { AppDispatch } from '../../store/store';
import type { RootState } from '../../store/store';

const Product_Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.Product);
    const categories = useSelector((state: RootState) => state.product.Category);
    const [filteredproducts, setFilterproducts] = useState(products);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;


    const totalPages = Math.ceil(filteredproducts.length / itemsPerPage);

    // คำนวณสินค้าที่จะแสดงในหน้าปัจจุบัน
    const currentItems = filteredproducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Modal รายละเอียดสินค้า
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    // โหลด Product ครั้งแรก
    useEffect(() => {
        fetchproduct();
        fetchcategory()
    }, [])

    // อัพเดตสินค้าที่กรองเมื่อมีการเปลี่ยนแปลงสินค้า
    useEffect(() => {
        setFilterproducts(products);
    }, [products])

    // ฟังก์ชันกรองสินค้าตามหมวดหมู่
    async function filterproducttype(type: string) {
        if (type === "ทั้งหมด") {
            setFilterproducts(products)
        }
        else {
            setFilterproducts(products.filter((p) => type === p.category.Category_Name))
        }
        setCurrentPage(1);
    }


    // ฟังก์ชันลบสินค้า
    async function deleteproduct(id: number , name : string) {
        try {

            const result = await Swal.fire({
                title: 'ยืนยันการสั่งซื้อ',
                text: `คุณต้องการลบสินค้า ${name} หรือไม่?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'ตกลง',
                cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#e53e3e',
                cancelButtonColor: '#718096',
            });

            if (result.isConfirmed) {

                // unwrap() จะ throw ถ้า removeProduct ถูก reject
                await dispatch(removeProduct(id)).unwrap();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'ลบข้อมูลสินค้าเรียบร้อย',
                    timer: 2000,
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                    timerProgressBar: true,
                }).then(() => {
                    fetchproduct();
                });

            }

        } catch (err: any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err || 'ไม่สามารถลบสินค้าได้',
                text: "สินค้านี้มีความสัมพันธ์ในฐานข้อมูล",
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
            });
        }
    }

    // ตัวโหลด Product
    async function fetchproduct() {
        try {
            await dispatch(fetchAll());
        } catch (err: any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err || 'โหลดสินค้าล้มเหลว',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
            });
        }
    }

    // ตัวโหลด Category
    async function fetchcategory() {
        try {
            await dispatch(fetchCategories());
        } catch (err: any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err || 'โหลดหมวดหมู่ล้มเหลว',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
            });
        }
    }


    // ฟังก์ชันไปหน้าแก้ไขสินค้า
    async function updateProduct(id: number) {
        navigate(`/Dashboard/Product_Update/${id}`);
    }

    return (
        <>
            <section className="flex flex-col w-full min-h-screen md:h-[90%] bg-gray-100 gap-2 overflow-x-hidden">

                {/* ส่วนเนื้อหา */}
                <main className="flex flex-col flex-1 bg-white shadow-md rounded-md p-6">
                    <p className="text-lg font-semibold">จัดการข้อมูลสินค้า</p>
                    <section className="rounded-lg h-auto border border-gray-200 shadow-lg p-4 mt-4 overflow-x-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">

                            <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full md:w-auto items-start md:items-center">
                                <p className="text-md md:text-lg">ค้นหาหมวดหมู่ :</p>
                                <select className="border border-gray-300 rounded-md p-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-red-500" onChange={(e) => filterproducttype(e.target.value)}>
                                    <option value="ทั้งหมด">ทั้งหมด</option>
                                    {categories.map((c, index) => (
                                        <option key={index} value={c.Category_Name}>{c.Category_Name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* ปุ่มเพิ่มข้อมูล */}
                            <button
                                onClick={() => navigate("/Dashboard/Product_Add")}
                                className="flex flex-row items-center justify-center gap-2 bg-red-500 rounded-md text-white hover:bg-red-600 text-md px-4 py-2 w-full md:w-[160px] cursor-pointer"
                            >
                                <FaPlus size={14} /> เพิ่มข้อมูลสินค้า
                            </button>
                        </div>

                        {/* ตาราง */}
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-center text-sm font-semibold text-gray-700">รูปสินค้า</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-700">ชื่อ</th>
                                        <th className="hidden lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">ราคา (บาท)</th>
                                        <th className="hidden lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">หมวดหมู่</th>
                                        <th className="p-3 text-center text-sm font-semibold text-gray-700">จำนวนคงเหลือ</th>
                                        <th className="p-3 text-center text-sm font-semibold text-gray-700">ปุ่มต่างๆ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((p) => (
                                        <tr key={p.Product_Id} className="hover:bg-gray-50 border-b border-gray-200 h-[50px]">
                                            <td className="p-3 flex justify-center items-center w-full">
                                                <div className="w-[80px] md:w-[100px]">
                                                    <img
                                                        src={`http://localhost:3000${p.Product_Image}`}
                                                        alt={p.Product_Name}
                                                        className="w-full h-20 sm:h-16 md:h-22 lg:h-20 object-cover rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-3 text-gray-800">{p.Product_Name}</td>
                                            <td className="p-3 text-gray-700 hidden lg:table-cell">{p.Product_Price}</td>
                                            <td className="p-3 text-gray-700 hidden lg:table-cell">{p.category.Category_Name}</td>
                                            <td className="p-3">
                                                {/* ฟอร์มแก้ไขจำนวนสินค้า */}
                                                <form
                                                    key={p.Product_Id}
                                                    className="flex justify-center w-full gap-2 flex-wrap"
                                                    onSubmit={async (e) => {
                                                        e.preventDefault();


                                                        const input = (e.currentTarget.querySelector('input') as HTMLInputElement);
                                                        const quantity = Number(input.value);

                                                        const formData = new FormData();
                                                        formData.append("Product_Quantity", String(quantity));

                                                        try {
                                                            await dispatch(updateProductQuantity({ productId: p.Product_Id, formData })).then(() => {
                                                                Swal.fire({
                                                                    position: 'center',
                                                                    icon: 'success',
                                                                    title: 'แก้ไขจำนวนสินค้าเรียบร้อย',
                                                                    timer: 2000,
                                                                    confirmButtonText: 'ตกลง',
                                                                    confirmButtonColor: '#e7605b',
                                                                });
                                                            })
                                                        } catch (err) {
                                                            Swal.fire({
                                                                position: 'center',
                                                                icon: 'error',
                                                                title: err || 'ไม่สามารถแก้ไขจำนวนสินค้าได้',
                                                                confirmButtonText: 'ตกลง',
                                                                confirmButtonColor: '#e7605b',
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        defaultValue={p.Product_Quantity} // ใช้ defaultValue แทน value
                                                        className="text-center border rounded-md p-1 focus:ring-2 focus:ring-red-400 focus:outline-none w-16"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 hover:bg-blue-600 transition rounded-md px-3 py-1 text-white cursor-pointer"
                                                    >
                                                        แก้ไข
                                                    </button>
                                                </form>
                                            </td>

                                            {/* ปุ่มต่างๆ */}
                                            <td className="p-3 items-center gap-2 h-full">
                                                <div className="p-2 flex flex-col sm:flex-row justify-center w-full gap-2">
                                                    <button
                                                        className="flex text-sm md:text-md items-center w-full sm:w-auto justify-center gap-1 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition cursor-pointer"
                                                        onClick={() => setOpenModalId(p.Product_Id)}
                                                    >
                                                        <FaCheck size={14} /> รายละเอียด
                                                    </button>
                                                    <button
                                                        className="flex text-sm md:text-md items-center w-full sm:w-auto justify-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition cursor-pointer"
                                                        onClick={() => updateProduct(p.Product_Id)}
                                                    >
                                                        <FaEdit size={14} /> แก้ไขข้อมูล
                                                    </button>
                                                    <button
                                                        className="flex text-sm md:text-md items-center w-full sm:w-auto justify-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer"
                                                        onClick={() => deleteproduct(p.Product_Id,p.Product_Name)}
                                                    >
                                                        <FaTrash size={14} /> ลบข้อมูล
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal รายละเอียดสินค้า */}
                        {openModalId && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                                <div
                                    className="absolute inset-0 bg-black"
                                    style={{ opacity: 0.2 }}
                                    onClick={() => setOpenModalId(null)}
                                />
                                <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 pointer-events-auto z-10">
                                    <button
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setOpenModalId(null)}
                                    >
                                        <FaTimes size={20} />
                                    </button>
                                    {currentItems
                                        .filter(p => p.Product_Id === openModalId)
                                        .map(p => (
                                            <div key={p.Product_Id}>
                                                <h2 className="text-xl font-semibold mb-4">รายละเอียดสินค้า</h2>
                                                <div className="flex flex-col gap-2">
                                                    <p className="flex items-center gap-2"><FaTag /> <strong>ชื่อสินค้า:</strong> {p.Product_Name}</p>
                                                    <p className="flex items-center gap-2"><FaListAlt /> <strong>หมวดหมู่:</strong> {p.category.Category_Name}</p>
                                                    <p className="flex items-center gap-2"><FaDollarSign /> <strong>ราคา:</strong> {p.Product_Price.toLocaleString()} บาท</p>
                                                    <p className="flex items-center gap-2"><FaCoins /> <strong>ราคาต้นทุนต่อชิ้น:</strong> {p.Product_Unitcost.toLocaleString()} บาท</p>
                                                    <p className="flex items-center gap-2"><FaBoxes /> <strong>จำนวนคงเหลือ:</strong> {p.Product_Quantity.toLocaleString()} ชิ้น</p>
                                                    <p className="flex items-center gap-2"><FaCheckCircle /> <strong>สถานะ:</strong> {p.Product_Status}</p>
                                                </div>
                                                <button
                                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                                                    onClick={() => setOpenModalId(null)}
                                                >
                                                    ปิด
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}


                        {/* Pagination */}
                        <div className="flex flex-row w-full justify-center items-center p-2">
                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                        </div>

                    </section>
                </main >
            </section >

        </>
    )
}

export default Product_Dashboard;