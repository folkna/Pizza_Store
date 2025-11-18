import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Loginstore } from "../../store/authSlice";
import { type AppDispatch } from "../../store/store";
import { Link } from "react-router";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [errusername, setErrusername] = useState(false);
    const [password, setPassword] = useState('');
    const [errpassword, setErrpassword] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() === '') {
            setErrusername(true);
            return;
        }
        if (password.trim() === '') {
            setErrpassword(true);
            return;
        }
        if (errusername || errpassword) {
            return;
        }
        try {
            const res = await dispatch(Loginstore({ identifier: username, password }));

            // ตรวจสอบสถานะการล็อกอิน
            if (Loginstore.fulfilled.match(res)) {
                Swal.fire({
                    title: 'ล็อกอินสำเร็จ!',
                    text: 'ยินดีต้อนรับสู่ระบบ',
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        navigate('/'); // ไปหน้าแรก
                    }
                });
            } else {
                if (Loginstore.rejected.match(res)) {
                    let msg = res.payload || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";

                    // สามารถเช็คหลายสถานะได้
                    if (msg === "ไม่พบผู้ใช้งาน") {
                        msg = "ไม่มีบัญชีผู้ใช้ในระบบ";
                    } else if (msg === "บัญชีถูกระงับการใช้งาน") {
                        msg = "บัญชีถูกระงับการใช้งาน";
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
        }
        catch (err) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถเข้าสู่ระบบได้',
                icon: 'error',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b'
            });
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center min-h-screen w-full bg-gray-50">
                <div className="flex justify-center min-h-screen w-4/5">
                    <section className="flex flex-col p-8 w-full md:w-3/5 xl:w-2/5 rounded-md">
                        <p className="text-3xl font-bold text-center mt-16 mb-6">เข้าสู่ระบบ</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Username */}
                            <div className="w-full">
                                <input
                                    className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                        ${errusername
                                            ? 'border-red-500 ring-red-500'
                                            : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                        } 
                           transition-colors`}
                                    type="text"
                                    placeholder="ชื่อผู้ใช้งาน"
                                    value={username}
                                    maxLength={20}
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
                                <input
                                    className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                        ${errusername
                                            ? 'border-red-500 ring-red-500'
                                            : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                        } 
                           transition-colors`}
                                    type="password"
                                    placeholder="รหัสผ่าน"
                                    value={password}
                                    maxLength={20}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => setErrpassword(false)}
                                />
                                {errusername && (
                                    <p className="text-red-500 text-xs mt-1">
                                        กรุณากรอกชื่อผู้ใช้งาน
                                    </p>
                                )}
                            </div>
                            <button className="w-full bg-red-500 text-white px-1 py-2 rounded-md hover:bg-red-600 duration-300">
                                เข้าสู่ระบบ
                            </button>
                            <p className="text-md self-center">ไม่มีบัญชี <Link to="/Register" className="text-red-500 hover:text-red-600 font-normal  duration-300">สมัครสมาชิก</Link> เลย</p>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Login;