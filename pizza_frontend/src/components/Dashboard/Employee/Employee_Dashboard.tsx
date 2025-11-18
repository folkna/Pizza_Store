import { FaEdit, FaInfoCircle, FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaPlus, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaClipboard } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Pagination from "../Pagination";
import {useDispatch , useSelector} from 'react-redux';
import {type AppDispatch, type RootState } from "../../store/store";
import { findEmployeeAll } from "../../store/employeeSlice";

const Employee_Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const employees = useSelector((state : RootState) => state.employee.employeeAll);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // คำนวณรายการที่จะแสดงในหน้าปัจจุบัน
    const currentItems = employees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Modal แสดงรายละเอียดพนักงาน
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    // ดึงข้อมูลพนักงาน
    useEffect(() => {
        dispatch(findEmployeeAll());
    }, [dispatch]);

    // ไปหน้าแก้ไขพนักงาน
    async function updateEmployee(id: number) {
        navigate(`/Dashboard/Employee_Update/${id}`);
    }

    // ไปหน้าเพิ่มพนักงาน
    async function addEmployee() {
        navigate(`/Dashboard/Employee_Add`);
    }

    return (
        <>
            <section className="flex w-full min-h-screen md:h-[90%]  bg-gray-100 gap-2">

                {/* Main content */}
                <main className="flex flex-col flex-1 bg-white shadow-md rounded-md p-6">
                    <p className="text-lg font-semibold">จัดการข้อมูลพนักงาน</p>
                    <section className="rounded-lg h-full border border-gray-200 shadow-lg p-4 mt-4">
                        <div className="flex flex-col md:flex-row justify-end items-center w-full p-4 gap-2">
                            <button
                                className="flex items-center gap-2 w-full justify-center md:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
                                onClick={addEmployee}
                            >
                                <FaPlus size={14} />
                                เพิ่มพนักงานใหม่
                            </button>
                        </div>
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 md:w-[10%] text-left text-sm font-semibold text-gray-700">รหัสพนักงาน</th>
                                    <th className="p-3 md:w-[15%] text-left text-sm font-semibold text-gray-700">ชื่อ - นามสกุล</th>
                                    <th className="hidden md:w-[15%] lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">อีเมล</th>
                                    <th className="hidden md:w-[15%] lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">เบอร์โทร</th>
                                    <th className="p-3 text-left md:w-[10%] text-sm font-semibold text-gray-700">บทบาท</th>
                                    <th className="p-3 text-center md:w-[25%] text-sm font-semibold text-gray-700">ปุ่มต่างๆ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((emp) => (
                                    <tr key={emp.Emp_Id} className="hover:bg-gray-50 border-b border-gray-200 h-[ุ50px]">
                                        <td className="p-2 text-gray-800 font-medium">{emp.Emp_Id}</td>
                                        <td className="p-2 text-gray-800 font-medium">{emp.Emp_Fname} {emp.Emp_Lname}</td>
                                        <td className="p-2 text-gray-700 hidden lg:table-cell">{emp.Emp_Email}</td>
                                        <td className="p-2 text-gray-700 hidden lg:table-cell">{emp.Emp_Tel}</td>
                                        <td className="p-2 text-gray-700">{emp.Emp_Role}</td>
                                        <td className="p-2 items-center gap-2 h-full">
                                            <div className='p-2 flex flex-col md:flex-row justify-center items-center gap-1'>
                                                <button className="flex text-sm md:text-md items-center justify-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition cursor-pointer w-full lg:w-auto" onClick={() => setOpenModalId(emp.Emp_Id)}>
                                                    <FaInfoCircle size={14} /> รายละเอียด
                                                </button>
                                                <button className="flex text-sm md:text-md items-center justify-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition cursor-pointer w-full lg:w-auto" onClick={() => updateEmployee(emp.Emp_Id)}>
                                                    <FaEdit size={14} /> แก้ไขข้อมูล
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {openModalId && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                                {/* Overlay โปร่ง */}
                                <div
                                    className="absolute inset-0 bg-black"
                                    style={{ opacity: 0.2 }}
                                    onClick={() => setOpenModalId(null)}
                                />

                                {/* Modal container */}
                                <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 pointer-events-auto z-10">
                                    {/* ปุ่มปิด */}
                                    <button
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setOpenModalId(null)}
                                    >
                                        <FaTimes size={20} />
                                    </button>

                                    {currentItems
                                        .filter(emp => emp.Emp_Id === openModalId)
                                        .map(emp => (
                                            <div key={emp.Emp_Id}>
                                                <h2 className="text-xl font-semibold mb-4">รายละเอียดพนักงาน</h2>
                                                <div className="flex flex-col gap-2">
                                                    <p className="flex items-center gap-2"><FaUser /> <strong>ชื่อ:</strong> {emp.Emp_Fname} {emp.Emp_Lname}</p>
                                                    <p className="flex items-center gap-2"><FaEnvelope /> <strong>อีเมล:</strong> {emp.Emp_Email}</p>
                                                    <p className="flex items-center gap-2"><FaPhone /> <strong>เบอร์โทร:</strong> {emp.Emp_Tel}</p>
                                                    <p className="flex items-center gap-2"><FaBriefcase /> <strong>บทบาท:</strong> {emp.Emp_Role}</p>
                                                    <p className="flex items-center gap-2"><FaCalendarAlt /> <strong>ปีที่เริ่มทำงาน:</strong> {emp.Emp_Workyear}</p>
                                                    <p className="flex items-center gap-2"><FaDollarSign /> <strong>เงินเดือน:</strong> {emp.Emp_Salary?.toLocaleString()} บาท</p>
                                                    <p className="flex items-start gap-2">
                                                        <FaMapMarkerAlt className="mt-1" />
                                                        <span className="line-clamp-3">
                                                            <strong>ที่อยู่:</strong> {emp.Emp_Hnumber} {emp.Emp_Alley} {emp.Emp_Village} {emp.Emp_Street} {emp.Emp_Subdistrict} {emp.Emp_District} {emp.Emp_Province} {emp.Emp_Poscode}
                                                        </span>
                                                    </p>
                                                    <p className="flex items-center gap-2"><FaUser /> <strong>ชื่อผู้ใช้:</strong> {emp.Emp_Username}</p>
                                                    <p className="flex items-center gap-2"><FaClipboard /> <strong>สถานะ:</strong> {emp.Emp_Status}</p>
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
                            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </section>
                </main >
            </section >
        </>
    )
}

export default Employee_Dashboard;