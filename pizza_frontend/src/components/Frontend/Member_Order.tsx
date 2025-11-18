import { useEffect, useState } from "react";
import { getOrdersByMemberId } from "../store/orderSlice";
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from "../store/store";
import { FaClipboardList, FaTruck, FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import Pagination from "../Dashboard/Pagination";

const Member_Order = () => {
    const dispatch = useDispatch<AppDispatch>();
    const member = useSelector((state: RootState) => state.auth.member);
    const orders = useSelector((state: RootState) => state.order.Order);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;


    // ดึงคำสั่งซื้อของสมาชิก
    useEffect(() => {
        if (!member) return;
        dispatch(getOrdersByMemberId({ memberId: String(member.memberId) }));
    }, [member, dispatch]);

    // การคำนวณการแบ่งหน้าคำสั่งซื้อ
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const currentOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ฟังก์ชันเพื่อกำหนดการแสดงผลตามสถานะคำสั่งซื้อ
    const getorderstatusconfig = (status: string) => {
        switch (status) {
            case "กำลังจัดเตรียมอาหาร":
                return {
                    text: "กำลังจัดเตรียมอาหาร",
                    icon: <FaClipboardList size={32} />,
                    bgColor: "bg-blue-100",
                    textColor: "text-blue-600",
                    borderColor: "border-blue-300"
                };
            case "กำลังจัดส่ง":
                return {
                    text: "กำลังจัดส่ง",
                    icon: <FaTruck size={32} />,
                    bgColor: "bg-orange-100",
                    textColor: "text-orange-600",
                    borderColor: "border-orange-300"
                };
            case "จัดส่งสำเร็จ":
                return {
                    text: "จัดส่งสำเร็จ",
                    icon: <FaCheckCircle size={32} />,
                    bgColor: "bg-green-100",
                    textColor: "text-green-600",
                    borderColor: "border-green-300"
                };
            default:
                return {
                    text: "ไม่ทราบสถานะ",
                    icon: <FaClipboardList size={32} />,
                    bgColor: "bg-gray-100",
                    textColor: "text-gray-600",
                    borderColor: "border-gray-300"
                };
        }
    };


    return (
        <>
            <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
                <main className="flex flex-col w-full max-w-6xl">
                    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <FaShoppingBag size={32} className="text-red-600" />
                            <p className="font-bold text-2xl md:text-3xl text-gray-900">
                                ประวัติการสั่งซื้อ
                            </p>
                        </div>

                        {/* แสดงข้อความเมื่อไม่มีคำสั่งซื้อ และ แสดงคำสั่งซื้อทั้งหมด */}
                        {!orders || orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                <FaShoppingBag size={64} className="mb-4 text-gray-300" />
                                <p className="text-xl font-medium">ยังไม่มีประวัติการสั่งซื้อ</p>
                                <p className="text-sm mt-2">เมื่อคุณสั่งซื้อสินค้า ประวัติจะแสดงที่นี่</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {currentOrders.map((order) => {
                                    const statusConfig = getorderstatusconfig(order.Order_Status);
                                    return (
                                        <div
                                            key={order.Order_Id}
                                            className="border-2 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-300 bg-white"
                                        >
                                            {/* ส่วนหัว */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b">
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-sm text-gray-500">หมายเลขคำสั่งซื้อ</p>
                                                    <p className="font-bold text-lg text-gray-900">#{order.Order_Id} {order.delivery ? (<p>หมายเลขออเดอร์ : {order.delivery.Delivery_Number}</p>) : ""}</p>
                                                </div>
                                                <div className="flex flex-col gap-1 text-right">
                                                    <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
                                                    <p className="font-medium text-gray-700">{new Date(order.Order_Date).toLocaleDateString("th-TH", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}</p>
                                                </div>
                                            </div>

                                            {/* ส่วนแสดงสถานะ */}
                                            <div className={`flex items-center gap-4 p-4 rounded-lg border-2 ${statusConfig.borderColor} ${statusConfig.bgColor} mb-4`}>
                                                <div className={statusConfig.textColor}>
                                                    {statusConfig.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-600 mb-1">สถานะคำสั่งซื้อ</p>
                                                    <p className={`font-bold text-lg ${statusConfig.textColor}`}>
                                                        {statusConfig.text}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* ส่วนแสดงคำสั่งซื้อ */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                
                                                {/* ส่วนแสดงที่อยู่จัดส่ง */}
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-semibold text-gray-700">ที่อยู่จัดส่ง</p>
                                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg line-clamp-2">
                                                        {order.Order_Address || "ไม่มีข้อมูลที่อยู่"}
                                                    </p>
                                                </div>

                                                {/* ส่วนแสดงยอดรวม */}
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-semibold text-gray-700">ยอดรวมทั้งหมด</p>
                                                    <div className="bg-red-50 p-3 rounded-lg">
                                                        <p className="text-2xl font-bold text-red-600">
                                                            ฿{order.Order_Amount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ส่วนผู้สั่งซื้อ */}
                                            <div className="mt-4 pt-4 border-t">
                                                <p className="text-sm text-gray-500">ผู้สั่งซื้อ</p>
                                                <p className="font-medium text-gray-700">
                                                    {order.member?.Mem_Fname} {order.member?.Mem_Lname}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <div className = "flex flex-row justify-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Member_Order;