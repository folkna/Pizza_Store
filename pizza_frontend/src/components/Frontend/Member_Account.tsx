import { FaUser } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { findMember, updateMember, type MemberForm} from "../store/memberSlice";
import Swal from "sweetalert2";

const Member_Account = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showchangepass, SetShowchangepass] = useState(false);
    
    const [old_password, setOld_password] = useState("");
    const [errold_password, setErrold_password] = useState(false);

    const [new_password, setNew_password] = useState("");
    const [errnew_password, setErrnew_password] = useState(false);

    const member = useSelector((state: RootState) => state.auth.member); 
    const memberData = useSelector((state: RootState) => state.member.Member);

    useEffect(() => {
        if (!member) return;
        dispatch(findMember({ memberId: String(member.memberId) }));
    }, [member, dispatch]);

    // จัดการการส่งฟอร์ม เปลี่ยนรหัสผ่าน
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!showchangepass) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'ไม่มีการเปลี่ยนแปลง',
                text: 'กรุณาเลือก "เปลี่ยนรหัสผ่าน" หากต้องการอัปเดตข้อมูล',
                timer: 2000,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timerProgressBar: true
            });
            return;
        }

        let hasError = false;

        // ตรวจสอบรหัสผ่านเดิม
        if (old_password.trim() === "") {
            setErrold_password(true);
            hasError = true;
        } else if (old_password !== memberData?.Mem_Password) {
            setErrold_password(true);
            hasError = true;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'รหัสผ่านไม่ถูกต้อง',
                text: 'รหัสผ่านปัจจุบันที่คุณกรอกไม่ถูกต้อง',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b'
            });
            return;
        } else {
            setErrold_password(false);
        }

        // ตรวจสอบรหัสผ่านใหม่
        if (new_password.trim() === "") {
            setErrnew_password(true);
            hasError = true;
        }
        else {
            setErrnew_password(false);
        }

        if (hasError) return;

        const member_update : MemberForm = {
            Mem_Id: String(member?.memberId),
            Mem_Password: new_password
        }

        try {
            if (!member) return;
            dispatch(updateMember(member_update));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'เปลี่ยนรหัสผ่านเรียบร้อย',
                timer: 2000,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timerProgressBar: true
            });

            // รีเซ็ตฟอร์ม
            setOld_password("");
            setNew_password("");
            SetShowchangepass(false);
            
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b'
            });
        }
    }

    return (
        <>
            <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
                <main className="flex flex-col w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col items-center mb-6 md:mb-8">
                        <FaUser size={70} className="text-gray-600 mb-4" />
                        <p className="font-bold text-2xl md:text-3xl text-gray-900">
                            โปรไฟล์ผู้ใช้งาน
                        </p>
                    </div>

                    <form className="flex flex-col gap-6 w-full" onSubmit={handlesubmit}>

                        {/* Name & Surname */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">

                            {/* Firstname */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    ชื่อ
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={memberData?.Mem_Fname || ""}
                                    disabled
                                    className="w-full border rounded-lg p-3 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed border-slate-300"
                                />
                            </div>

                            {/* Lastname */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="surname" className="block text-sm font-medium text-slate-700 mb-2">
                                    นามสกุล
                                </label>
                                <input
                                    id="surname"
                                    type="text"
                                    value={memberData?.Mem_Lname || ""}
                                    disabled
                                    className="w-full border rounded-lg p-3 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed border-slate-300"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                อีเมล
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={memberData?.Mem_Email || ""}
                                disabled
                                className="w-full border rounded-lg p-3 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed border-slate-300"
                            />
                        </div>

                        {/* Tel */}
                        <div className="w-full">
                            <label htmlFor="tel" className="block text-sm font-medium text-slate-700 mb-2">
                                เบอร์โทร
                            </label>
                            <input
                                id="tel"
                                type="tel"
                                value={memberData?.Mem_Tel || ""}
                                disabled
                                className="w-full border rounded-lg p-3 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed border-slate-300"
                            />
                        </div>

                        {/* Username */}
                        <div className="w-full">
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                ชื่อผู้ใช้งาน
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={memberData?.Mem_Username || ""}
                                disabled
                                className="w-full border rounded-lg p-3 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed border-slate-300"
                            />
                        </div>

                        {/* Change Password Section */}
                        <div className="w-full border-t pt-6 mt-2">
                            <p className="text-lg font-semibold text-gray-800 mb-4">เปลี่ยนรหัสผ่าน</p>
                            
                            {showchangepass ? (
                                <div className="flex flex-col gap-4">

                                    {/* Old Password */}
                                    <div className="w-full">
                                        <label htmlFor="current_password" className="block text-sm font-medium text-slate-700 mb-2">
                                            รหัสผ่านปัจจุบัน
                                        </label>
                                        <input
                                            id="current_password"
                                            type="password"
                                            placeholder="กรอกรหัสผ่านปัจจุบัน"
                                            value={old_password}
                                            onChange={(e) => setOld_password(e.target.value)}
                                            onBlur={() => setErrold_password(false)}
                                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                            ${errold_password ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                        />
                                        {errold_password && <p className="text-red-500 text-xs mt-1">รหัสผ่านปัจจุบันไม่ถูกต้อง</p>}
                                    </div>

                                    {/* New Password */}
                                    <div className="w-full">
                                        <label htmlFor="new_password" className="block text-sm font-medium text-slate-700 mb-2">
                                            รหัสผ่านใหม่
                                        </label>
                                        <input
                                            id="new_password"
                                            type="password"
                                            placeholder="กรอกรหัสผ่านใหม่"
                                            value={new_password}
                                            onChange={(e) => setNew_password(e.target.value)}
                                            onBlur={() => setErrnew_password(false)}
                                            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                            ${errnew_password ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                        />
                                        {errnew_password && <p className="text-red-500 text-xs mt-1">กรุณากรอกรหัสผ่านใหม่</p>}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            SetShowchangepass(false);
                                            setOld_password("");
                                            setNew_password("");
                                            setErrold_password(false);
                                            setErrnew_password(false);
                                        }}
                                        className="w-full md:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 
                                        text-gray-800 rounded-lg shadow-md duration-300 font-semibold
                                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    >
                                        ยกเลิก
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => SetShowchangepass(true)}
                                    className="w-full md:w-auto px-6 py-3 bg-white border-2 border-red-500 hover:bg-red-50 
                                    text-red-500 rounded-lg shadow-md duration-300 font-semibold
                                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    เปลี่ยนรหัสผ่าน
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        {showchangepass && (
                            <button
                                type="submit"
                                className="mt-4 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 
                                text-white rounded-lg shadow-md duration-300 font-semibold
                                focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                            >
                                บันทึกการเปลี่ยนแปลง
                            </button>
                        )}
                    </form>
                </main>
            </section>
        </>
    )
}

export default Member_Account