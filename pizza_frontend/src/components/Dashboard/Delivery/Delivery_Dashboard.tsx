import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { fetchDeliveryAll } from "../../store/deliverySlice";
import { FaInfoCircle, FaTimes, FaUser, FaMapMarkerAlt, FaClipboardCheck, FaBarcode, FaTruck } from "react-icons/fa";

const Delivery_Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const deliveries = useSelector((state: RootState) => state.delivery.deliveries);
    const [filterDeliveries, setFilterDeliveries] = useState(deliveries);
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filterDeliveries.length / itemsPerPage);

    // การคำนวณรายการที่จะแสดงในหน้าปัจจุบัน
    const currentItems = filterDeliveries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ดึงข้อมูลการจัดส่งทั้งหมด
    useEffect(() => {
        dispatch(fetchDeliveryAll({}));
    }, [dispatch]);

    // อัปเดตข้อมูลการจัดส่งที่กรองแล้วเมื่อข้อมูลการจัดส่งเปลี่ยนแปลง
    useEffect(() => {
        setFilterDeliveries(deliveries);
    }, [deliveries]);

    // ฟังก์ชันกรองสถานะการจัดส่ง
    async function filterDeliveryStatus(status: string) {
        if (status === "ทั้งหมด") {
            setFilterDeliveries(deliveries);
        } else {
            setFilterDeliveries(deliveries.filter((d) => status === d.Delivery_Status));
        }
        setCurrentPage(1);
    }

    return (
        <section className="flex w-full min-h-screen bg-gray-100 gap-2">
            <main className="flex flex-col flex-1 bg-white shadow-md rounded-md p-6">
                <p className="text-lg font-semibold">จัดการข้อมูลการจัดส่ง</p>

                {/* สถานะการขนส่ง */}
                <section className="rounded-lg border border-gray-200 shadow-lg p-4 mt-4 gap-2 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full md:w-auto items-start md:items-center">
                        <p className="text-md md:text-lg">ค้นหาสถานะ :</p>
                        <select 
                            className="border border-gray-300 rounded-md p-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-red-500" 
                            onChange={(e) => filterDeliveryStatus(e.target.value)}
                        >
                            <option value="ทั้งหมด">ทั้งหมด</option>
                            <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                            <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                        </select>
                    </div>
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">รหัสการจัดส่ง</th>
                                <th className="p-3 text-left text-sm font-semibold w-[40%] text-gray-700 hidden md:table-cell">ที่อยู่</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">วันที่</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">ปุ่มต่างๆ</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {currentItems.map((delivery) => (
                                <tr key={delivery.Delivery_Id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="p-2 font-medium text-gray-800">{delivery.Delivery_Id}</td>
                                    <td className="p-2 text-gray-700 hidden md:table-cell">
                                        <div className="truncate max-w-xs" title={delivery.order?.Order_Address}>
                                            {delivery.order?.Order_Address || "ไม่มีข้อมูล"}
                                        </div>
                                    </td>
                                    <td className="p-2 text-gray-700 hidden md:table-cell">
                                        {new Date().toLocaleDateString("th-TH", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="p-2 text-gray-700">
                                        {delivery.Delivery_Status}
                                    </td>
                                    <td className="p-2 flex text-center justify-center">

                                        {/* ปุ่มดูรายละเอียด */}
                                        <div className="flex gap-2 justify-start">
                                            <button
                                                className="flex text-sm md:text-md items-center justify-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer w-full lg:w-auto"
                                                onClick={() => setOpenModalId(delivery.Delivery_Id)}
                                            >
                                                <FaInfoCircle /> ดูรายละเอียด
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal แสดงรายละเอียดการขนส่ง */}
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

                                {deliveries
                                    .filter((d) => d.Delivery_Id === openModalId)
                                    .map((d) => (
                                        <div key={d.Delivery_Id}>
                                            <h2 className="text-xl font-semibold mb-4">รายละเอียดการจัดส่ง</h2>
                                            <div className="flex flex-col gap-2">
                                                <p className="flex items-center gap-2">
                                                    <FaClipboardCheck /> <strong>รหัสการจัดส่ง:</strong> {d.Delivery_Id}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaClipboardCheck /> <strong>รหัสคำสั่งซื้อ:</strong> {d.order?.Order_Id}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaUser /> <strong>ผู้รับ:</strong>{" "}
                                                    {d.order.member.Mem_Fname} {d.order.member.Mem_Lname}
                                                </p>
                                                <p>
                                                    <div className=  "flex items-center gap-2"><FaMapMarkerAlt /> <strong>ที่อยู่จัดส่ง:</strong>{" "}</div>
                                                    {d.order?.Order_Address || "ไม่มีข้อมูล"}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaBarcode /> <strong>หมายเลขพัสดุ:</strong>{" "}
                                                    {d.Delivery_Number}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FaTruck /> <strong>สถานะ:</strong>{" "}
                                                    {d.Delivery_Status}
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

export default Delivery_Dashboard;