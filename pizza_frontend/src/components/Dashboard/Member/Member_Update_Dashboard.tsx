import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store/store";
import { findMember, updateMember } from "../../store/memberSlice";

const Member_Update_Dashboard = () => {
    const { id } = useParams<{ id: string }>();
    const [member, setMember] = useState<any>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Form state
    const [status, setStatus] = useState("");

    // Error state
    const [errstatus, setErrstatus] = useState(false);

    // ดึงข้อมูลสมาชิกตาม id
    useEffect(() => {
        if (!id) return;

        const fetchMember = async () => {
            try {
                const memberData = await dispatch(findMember({ memberId: id })).unwrap();

                if (memberData?.Mem_Id) {
                    setMember(memberData);
                    setStatus(memberData.Mem_Status);
                }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "ไม่พบข้อมูลสมาชิก",
                    timer: 2000,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#e7605b",
                    timerProgressBar: true,
                    willClose: () => {
                        navigate("/Dashboard/Member");
                    },
                });
            }
        };

        fetchMember();
    }, [id, dispatch]);

    // ฟังก์ชันจัดการการส่งฟอร์ม
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        let hasError = false;

        if (status.trim() === "") {
            setErrstatus(true);
            hasError = true;
        } else {
            setErrstatus(false);
        }

        if (hasError) return;

        try {
            await dispatch(
                updateMember({
                    Mem_Id: id!,
                    Mem_Status: status,
                })
            ).unwrap();

            Swal.fire({
                position: "center",
                icon: "success",
                title: "แก้ไขสถานะสมาชิกเรียบร้อย",
                timer: 2000,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
                timerProgressBar: true,
                willClose: () => {
                    navigate("/Dashboard/Member");
                },
            });
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาดในการแก้ไขสถานะสมาชิก",
                timer: 2000,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
                timerProgressBar: true,
            });
        }
    }

    // ฟังก์ชันจัดรูปแบบวันที่
    const formatDate = (date: Date | string) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
            {member.Mem_Id ? (
                <main className="flex flex-col w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                    <p className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8">
                        แก้ไขข้อมูลสมาชิกหมายเลข {member.Mem_Id}
                    </p>

                    {/* ข้อมูลสมาชิก (แสดงอย่างเดียว) */}
                    <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
                        <h3 className="font-semibold text-lg text-slate-700 mb-4">
                            ข้อมูลสมาชิก
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">ชื่อ-นามสกุล</p>
                                <p className="text-base font-medium text-slate-900">
                                    {member.Mem_Fname} {member.Mem_Lname}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">ชื่อผู้ใช้งาน</p>
                                <p className="text-base font-medium text-slate-900">
                                    {member.Mem_Username}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">อีเมล</p>
                                <p className="text-base font-medium text-slate-900">
                                    {member.Mem_Email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">เบอร์โทรศัพท์</p>
                                <p className="text-base font-medium text-slate-900">
                                    {member.Mem_Tel}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">วันที่สมัครสมาชิก</p>
                                <p className="text-base font-medium text-slate-900">
                                    {formatDate(member.Mem_Sdate)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">สถานะปัจจุบัน</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                        ${
                                            member.Mem_Status === "ปกติ"
                                                ? "bg-green-100 text-green-800"
                                                : member.Mem_Status === "ถูกระงับ"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {member.Mem_Status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ฟอร์มแก้ไขสถานะ */}
                    <form className="flex flex-col gap-6 w-full" onSubmit={handlesubmit}>
                        <div className="w-full">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                เปลี่ยนสถานะสมาชิก
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={() => setErrstatus(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white
                                    ${
                                        errstatus
                                            ? "border-red-500 ring-red-500"
                                            : "border-slate-300 focus:border-red-500 focus:ring-red-500"
                                    }`}
                            >
                                <option value="">-- เลือกสถานะสมาชิก --</option>
                                <option value="ปกติ">ปกติ</option>
                                <option value="ถูกระงับ">ถูกระงับ</option>
                            </select>
                            {errstatus && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณาเลือกสถานะสมาชิก
                                </p>
                            )}
                        </div>

                        {/* ปุ่มบันทึก */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 md:flex-none md:px-6 py-3 bg-red-600 hover:bg-red-700 
                                    text-white rounded-lg shadow-md duration-300 font-semibold
                                    focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                            >
                                บันทึกการเปลี่ยนแปลง
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/Dashboard/Member")}
                                className="flex-1 md:flex-none md:px-6 py-3 bg-slate-200 hover:bg-slate-300 
                                    text-slate-700 rounded-lg shadow-md duration-300 font-semibold
                                    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </form>
                </main>
            ) : null}
        </section>
    );
};

export default Member_Update_Dashboard;