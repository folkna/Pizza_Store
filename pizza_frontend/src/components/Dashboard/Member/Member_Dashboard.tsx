import { FaInfoCircle, FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaToggleOn, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { findMemberAll, findMember } from "../../store/memberSlice";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import Swal from "sweetalert2";
import {type Member } from "../../store/memberSlice";

const Member_Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const members = useSelector((state: RootState) => state.member.MemberAll);
    const [filteredMember, setFilteredMember] = useState<Member[]>(members);
    const [member, setMember] = useState("");
    const [showcancel, setShowcancel] = useState(false)
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(members.length / itemsPerPage);

    // คำนวณสมาชิกที่จะแสดงในหน้าปัจจุบัน
    const currentItems = filteredMember.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Modal รายละเอียดสมาชิก
    const [openModalId, setOpenModalId] = useState<string | null>(null);

    useEffect(() => {
        if (showcancel) return;
        fetchmembers();
        setFilteredMember(members);
    }, [showcancel]);

    useEffect(() => {
        setFilteredMember(members);
    },[members])

    // ดึงข้อมูล Members
    async function fetchmembers() {
        try {
            await dispatch(findMemberAll());
        }
        catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'ไม่สามารถโหลดข้อมูลสมาชิกได้',
                timer: 2000,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timerProgressBar: true,
                willClose: () => { navigate("/Dashboard"); }
            });
        }
    }

    // ค้นหาข้อมูล member ด้วย id
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!member) return;

        try {
            const data = await dispatch(findMember({ memberId: member })).unwrap();
            if (data) {
                setFilteredMember([data]);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ไม่มีสมาชิกที่ค้นหา",
                    timer: 1000,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#e7605b",
                    timerProgressBar: true,
                });
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "ไม่สามารถโหลดข้อมูลสมาชิกได้",
                timer: 2000,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
                timerProgressBar: true,
            });
        }
    };

    // หน้าอัปเดตข้อมูล member
    async function updatemember(id: string) {
        navigate(`/Dashboard/Member_Update/${id}`);
    }

    return (
        <>
            <section className="flex w-full min-h-screen md:h-[90%]  bg-gray-100 gap-2">
                {/* Main content */}
                <main className="flex flex-col flex-1 bg-white shadow-md rounded-md p-6">
                    <p className="text-lg font-semibold">จัดการข้อมูลสมาชิก</p>
                    <section className="rounded-lg h-full border border-gray-200 shadow-lg p-4 mt-4">
                        <div className="flex flex-col md:flex-row justify-start items-center w-full p-4 gap-2">
                            <p className="text-md md:text-lg self-start md:self-auto">ค้นหาสมาชิก:</p>
                            <form className="flex w-full md:w-auto flex-col md:flex-row gap-2" onSubmit={handleSearch}>
                                <input type="text" className="border w-full md:w-[250px] border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="รหัสสมาชิก" value={member} onChange={(e) => setMember(e.target.value)} />
                                <button type="submit" className="px-3 p-2 :w-[80px] bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-md " onClick={() => setShowcancel(!showcancel)}>ค้นหา</button>
                            </form>
                            <button className={`px-3 w-full md:w-auto  md p-2 bg-red-400 hover:bg-red-500 cursor-pointer rounded-md  ${showcancel ? "" : "hidden"}`} onClick={() => { setShowcancel(false); setMember(""); }}>ยกเลิก</button>
                        </div>
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 md:w-[10%] text-left text-sm font-semibold text-gray-700">รหัสสมาชิก</th>
                                    <th className="p-3 md:w-[25%] text-left text-sm font-semibold text-gray-700">ชื่อ - นามสกุล</th>
                                    <th className="hidden md:w-[15%] lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">อีเมล</th>
                                    <th className="hidden md:w-[15%] lg:table-cell p-3 text-left text-sm font-semibold text-gray-700">เบอร์โทร</th>
                                    <th className="p-3 text-left md:w-[5%] text-sm font-semibold text-gray-700">สถานะ</th>
                                    <th className="p-3 text-center md:w-[20%] text-sm font-semibold text-gray-700">ปุ่มต่างๆ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((m) => (
                                    <tr key={m.Mem_Id} className="hover:bg-gray-50 border-b border-gray-200 h-[ุ50px]">
                                        <td className="p-2 text-gray-800 font-medium">{m.Mem_Id}</td>
                                        <td className="p-2 text-gray-800 font-medium">{m.Mem_Fname} {m.Mem_Lname}</td>
                                        <td className="p-2 text-gray-700 hidden lg:table-cell">{m.Mem_Email}</td>
                                        <td className="p-2 text-gray-700 hidden lg:table-cell">{m.Mem_Tel}</td>
                                        <td className="p-2 text-gray-700">{m.Mem_Status}</td>
                                        <td className="p-2 items-center gap-2 h-full">
                                            <div className='p-2 flex flex-col md:flex-row justify-center items-center gap-1'>
                                                <button className="flex text-sm md:text-md items-center justify-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition cursor-pointer w-full lg:w-auto" onClick={() => setOpenModalId(m.Mem_Id)}>
                                                    <FaInfoCircle size={14} /> รายละเอียด
                                                </button>
                                                <button className="flex text-sm md:text-md items-center justify-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition cursor-pointer w-full lg:w-auto" onClick={() => updatemember(m.Mem_Id)}>
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
                                    onClick={() => setOpenModalId(null)} // กดที่ background ปิด modal
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
                                        .filter(m => m.Mem_Id === openModalId)
                                        .map(m => (
                                            <div key={m.Mem_Id}>
                                                <h2 className="text-xl font-semibold mb-4">รายละเอียดสมาชิก</h2>
                                                <div className="flex flex-col gap-2">
                                                    <p className="flex items-center gap-2"><FaUser /> <strong>ชื่อ:</strong> {m.Mem_Fname} {m.Mem_Lname}</p>
                                                    <p className="flex items-center gap-2"><FaEnvelope /> <strong>อีเมล:</strong> {m.Mem_Email}</p>
                                                    <p className="flex items-center gap-2"><FaPhone /> <strong>เบอร์โทร:</strong> {m.Mem_Tel}</p>
                                                    <p className="flex items-center gap-2"><FaCalendarAlt /> <strong>วันที่สมัคร:</strong> {new Date(m.Mem_Sdate).toLocaleDateString("th-TH", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}</p>
                                                    <p className="flex items-center gap-2"><FaToggleOn /> <strong>สถานะ:</strong> {m.Mem_Status}</p>
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
                        <div className="flex flex-row w-full justify-center items-center p-2">
                            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </section>
                </main >
            </section >
        </>
    )
}


export default Member_Dashboard 