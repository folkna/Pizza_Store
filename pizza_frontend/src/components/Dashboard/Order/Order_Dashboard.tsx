import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { fetchOrders } from "../../store/orderSlice";
import { FaInfoCircle, FaTimes, FaUser, FaCalendarAlt, FaMoneyBill, FaClipboardCheck, FaCartPlus, FaTruck } from "react-icons/fa";
import { createDelivery } from "../../store/deliverySlice";
import Swal from "sweetalert2";

const Order_Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const orders = useSelector((state: RootState) => state.order.Order);
    const [filterorders, setFilterorders] = useState(orders);
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filterorders.length / itemsPerPage);

    // คำนวณคำสั่งซื้อที่จะแสดงในหน้าปัจจุบัน
    const currentItems = filterorders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // โหลดคำสั่งซื้อครั้งแรก
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // อัพเดตคำสั่งซื้อที่กรองเมื่อมีการเปลี่ยนแปลงคำสั่งซื้อ
    useEffect(() => {
        setFilterorders(orders);
    }, [orders])

    // ฟังก์ชันกรองคำสั่งซื้อตามสถานะ
    async function filterordertype(type: string) {
        if (type === "ทั้งหมด") {
            setFilterorders(orders);
        }
        else {
            setFilterorders(orders.filter((o) => type === o.Order_Status))
        }
        setCurrentPage(1);
    }

    // ฟังก์ชันยืนยันการจัดส่งคำสั่งซื้อ
    async function confirmDelivery(orderId: number) {
        const result = await Swal.fire({
            title: 'ยืนยันการจัดส่ง',
            text: "คุณต้องการยืนยันการจัดส่งคำสั่งซื้อนี้หรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e53e3e',
            cancelButtonColor: '#718096',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        });

        if (result.isConfirmed) {
            try {
                await dispatch(createDelivery({ orderId: orderId }))
                await dispatch(fetchOrders());
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: 'คำสั่งซื้อถูกยืนยันการจัดส่งเรียบร้อยแล้ว',
                    icon: 'success',
                    confirmButtonColor: '#e53e3e',
                    timer: 2000,
                });
            } catch (err) {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'ไม่สามารถยืนยันการจัดส่งได้',
                    icon: 'error',
                    confirmButtonColor: '#e53e3e',
                });
            }
        }
    }

    return (
        <section className="flex w-full min-h-screen bg-gray-100 gap-2">
            <main className="flex flex-col flex-1 bg-white shadow-md rounded-md p-6">
                <p className="text-lg font-semibold">จัดการข้อมูลคำสั่งซื้อ</p>
                <section className="rounded-lg border border-gray-200 shadow-lg p-4 mt-4 gap-2 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full md:w-auto items-start md:items-center">
                        <p className="text-md md:text-lg">ค้นหาสถานะ :</p>
                        <select className="border border-gray-300 rounded-md p-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-red-500" onChange={(e) => filterordertype(e.target.value)}>
                            <option value="ทั้งหมด">ทั้งหมด</option>
                            <option value="กำลังจัดเตรียมอาหาร">กำลังจัดเตรียมอาหาร</option>
                            <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                            <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                        </select>
                    </div>
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">รหัสคำสั่งซื้อ</th>
                                <th className="p-3 text-left w-[25%] text-sm hidden md:table-cell font-semibold text-gray-700">ชื่อผู้สั่งซื้อ</th>
                                <th className="p-3 text-left text-sm hidden sm:flex font-semibold text-gray-700">ยอดรวม</th>
                                <th className="p-3 text-left text-sm  font-semibold text-gray-700">สถานะ</th>
                                <th className="p-3 text-left text-sm hidden md:table-cell font-semibold text-gray-700">วันที่สั่งซื้อ</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">ปุ่มต่างๆ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* แสดงคำสั่งซื้อที่กรองแล้ว */}
                            {currentItems.map((order) => (
                                <tr key={order.Order_Id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="p-2 font-medium  text-gray-800">{order.Order_Id}</td>
                                    <td className="p-2 text-gray-700 hidden md:table-cell">
                                        {order.member.Mem_Fname} {order.member.Mem_Lname}
                                    </td>
                                    <td className="p-2 text-gray-700 hidden sm:flex">{order.Order_Amount.toLocaleString()} บาท</td>
                                    <td className="p-2 text-gray-700">
                                        {order.Order_Status}
                                    </td>
                                    <td className="p-2 text-gray-700 hidden md:table-cell">
                                        {new Date(order.Order_Date).toLocaleDateString("th-TH", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>

                                    {/* ปุ่มต่างๆ */}
                                    <td className="p-2 flex  text-center items-center justify-center">
                                        <div className="flex flex-col md:flex-row gap-2 justify-start">
                                            {order.Order_Status === "กำลังจัดเตรียมอาหาร" && (
                                                <button
                                                    className="flex text-sm md:text-md items-center justify-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition cursor-pointer w-full lg:w-auto"
                                                    onClick={() => confirmDelivery(order.Order_Id)}
                                                >
                                                    <FaTruck /> ยืนยันการจัดส่ง
                                                </button>
                                            )}
                                            <button
                                                className="flex text-sm md:text-md items-center justify-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer w-full lg:w-auto"
                                                onClick={() => setOpenModalId(order.Order_Id)}
                                            >
                                                <FaInfoCircle /> ดูรายละเอียด
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal แสดงรายละเอียดคำสั่งซื้อ */}
                    {openModalId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div
                                className="absolute inset-0 bg-black opacity-30"
                                onClick={() => setOpenModalId(null)}
                            ></div>
                            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 z-10">
                                <button
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                    onClick={() => setOpenModalId(null)}
                                >
                                    <FaTimes size={20} />
                                </button>

                                {orders
                                    .filter((o) => o.Order_Id === openModalId)
                                    .map((o) => (
                                        <div key={o.Order_Id}>
                                            <h2 className="text-xl font-semibold mb-4">รายละเอียดคำสั่งซื้อ</h2>
                                            <div className="flex flex-col gap-2">
                                                <p className="flex items-center gap-2">
                                                    <FaClipboardCheck /> <strong>รหัสคำสั่งซื้อ:</strong> {o.Order_Id}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaUser /> <strong>ชื่อผู้สั่งซื้อ:</strong>{" "}
                                                    {o.member.Mem_Fname} {o.member.Mem_Lname}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaCartPlus /> <strong>รายการสั่งซื้อ:</strong>{" "}
                                                </p>
                                                <div className="flex flex-col text-sm">
                                                    {o.cart.cart_products.map((ci) => (
                                                        <div
                                                            key={ci.Cartproduct_Id}
                                                            className="truncate w-72" // กำหนด max width
                                                            title={`${ci.product?.Product_Name} x ${ci.Cartproduct_Quantity} ชิ้น ราคา: ${ci.product ? ci.product.Product_Price * ci.Cartproduct_Quantity : 0} ฿`} // hover แสดงเต็ม
                                                        >
                                                            {ci.product?.Product_Name} x {ci.Cartproduct_Quantity} ชิ้น </div>
                                                    ))}
                                                </div>
                                                <p className="flex items-center gap-2">
                                                    <FaMoneyBill /> <strong>ยอดรวม:</strong>{" "}
                                                    {o.Order_Amount.toLocaleString()} บาท
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaClipboardCheck /> <strong>สถานะ:</strong>{" "}
                                                    {o.Order_Status}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaCalendarAlt /> <strong>วันที่สั่งซื้อ:</strong>{" "}
                                                    {new Date(o.Order_Date).toLocaleDateString("th-TH", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                            <button
                                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
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
                    <div className="flex justify-center p-2">
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </section>
            </main>
        </section>
    );
};

export default Order_Dashboard;
