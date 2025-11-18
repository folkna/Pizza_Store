import { useState } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Loginemployeestore } from "../../store/employeeauthSlice";
import { type AppDispatch } from "../../store/store";

const Employee_Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState("");
    const [errusername, setErrusername] = useState(false);
    const [password, setPassword] = useState("");
    const [errpassword, setErrpassword] = useState(false);
    const navigate = useNavigate();

    // ฟังก์ชันจัดการการส่งฟอร์ม
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        let hasError = false;

        // ชื่อผู้ใช้
        if (username.trim() === "") {
            setErrusername(true);
            hasError = true;
        } else {
            setErrusername(false);
        }

        // รหัสผ่าน
        if (password.trim() === "") {
            setErrpassword(true);
            hasError = true;
        } else {
            setErrpassword(false);
        }

        if (!hasError) {
            try {

                // รอ dispatch ให้เสร็จ
                const res = await dispatch(Loginemployeestore({ identifier: username, password }));

                // ตรวจสอบสถานะการล็อกอิน
                if (Loginemployeestore.fulfilled.match(res)) {
                    Swal.fire({
                        title: 'ล็อกอินสำเร็จ!',
                        text: 'ยินดีต้อนรับสู่ระบบ',
                        icon: 'success',
                        confirmButtonText: 'ตกลง',
                        confirmButtonColor: '#e7605b',
                        timer: 2000,
                        timerProgressBar: true,
                        willClose: () => {
                            navigate('/Dashboard'); // ไปหน้าแรก
                        }
                    });
                } else {
                    if (Loginemployeestore.rejected.match(res)) {
                        let msg = res.payload || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";

                        // สามารถเช็คหลายสถานะได้
                        if (msg === "ไม่พบผู้ใช้งาน") {
                            msg = "ไม่มีบัญชีผู้ใช้ในระบบ";
                        } else if (msg === "คุณไม่มีสิทธิในการเข้าสู่ระบบ") {
                            msg = "คุณไม่มีสิทธิในการเข้าสู่ระบบ";
                        } else if (msg === "รหัสผ่านไม่ถูกต้อง") {
                            msg = "กรุณากรอกรหัสผ่านให้ถูกต้อง";
                        }

                        Swal.fire({
                            title: 'ผิดพลาด!',
                            text: msg,
                            icon: 'error',
                            confirmButtonText: 'ตกลง',
                            confirmButtonColor: '#e7605b'
                        });
                    }
                }
            } catch (err) {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้',
                    icon: 'error',
                    confirmButtonText: 'ตกลง'
                });
            }
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center bg-slate-100 p-4">
                <section className="flex flex-col items-center justify-center w-full max-w-md h-auto shadow-xl bg-white rounded-2xl overflow-hidden">
                    <div
                        className="flex justify-center bg-red-600 w-full text-white 
                       py-5 rounded-t-2xl text-2xl font-bold tracking-tight"
                    >
                        ล็อกอินพนักงาน
                    </div>

                    {/* ฟอร์มล็อกอิน */}
                    <form
                        className="flex flex-col w-full gap-6 p-6 md:p-8"
                        onSubmit={(e) => {
                            handlesubmit(e);
                        }}>

                        {/* Username */}
                        <div className="w-full">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                ชื่อผู้ใช้งาน
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="กรอกชื่อผู้ใช้งาน"
                                className={`w-full border p-3 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2
                           placeholder:text-slate-400
                           ${errusername
                                        ? 'border-red-500 ring-red-500'
                                        : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                    } 
                           transition-colors`}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => setErrusername(false)}
                            />
                            {errusername && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณากรอกชื่อผู้ใช้งาน
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="กรอกรหัสผ่าน"
                                className={`w-full border p-3 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2
                           placeholder:text-slate-400
                           ${errpassword
                                        ? 'border-red-500 ring-red-500'
                                        : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                    } 
                           transition-colors`}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setErrpassword(false)}
                            />
                            {errpassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณากรอกรหัสผ่าน
                                </p>
                            )}
                        </div>

                        {/* ปุ่มล็อกอิน */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold 
                         hover:bg-red-700 transition-colors duration-300 
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mt-2">
                            เข้าสู่ระบบ
                        </button>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Employee_Login