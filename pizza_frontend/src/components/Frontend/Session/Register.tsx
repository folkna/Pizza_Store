import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store/store";
import { register } from "../../store/memberSlice";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [errfname, setErrfname] = useState(false);

    const [lname, setLname] = useState("");
    const [errlname, setErrlname] = useState(false);

    const [username, setUsername] = useState("");
    const [errusername, setErrusername] = useState(false);

    const [email, setEmail] = useState("");
    const [erremail, setErremail] = useState(false);

    const [tel, setTel] = useState("");
    const [errtel, setErrtel] = useState(false);

    const [password, setPassword] = useState("");
    const [errpassword, setErrpassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [errconfirmPassword, setErrconfirmPassword] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        // ตรวจสอบชื่อ
        if (fname.trim() === "") {
            setErrfname(true);
            hasError = true;
        } else {
            setErrfname(false);
        }

        // ตรวจสอบนามสกุล
        if (lname.trim() === "") {
            setErrlname(true);
            hasError = true;
        } else {
            setErrlname(false);
        }

        // ตรวจสอบชื่อผู้ใช้งาน
        if (username.trim() === "") {
            setErrusername(true);
            hasError = true;
        } else {
            setErrusername(false);
        }

        // ตรวจสอบอีเมล
        if (email.trim() === "") {
            setErremail(true);
            hasError = true;
        } else {
            setErremail(false);
        }

        // ตรวจสอบเบอร์โทร
        if (tel.trim() === "") {
            setErrtel(true);
            hasError = true;
        } else {
            setErrtel(false);
        }

        // ตรวจสอบรหัสผ่าน
        if (password.trim() === "") {
            setErrpassword(true);
            hasError = true;
        } else {
            setErrpassword(false);
        }

        // ตรวจสอบยืนยันรหัสผ่าน
        if (confirmPassword.trim() === "") {
            setErrconfirmPassword(true);
            hasError = true;
        } else {
            setErrconfirmPassword(false);
        }

        if (hasError) return;

        // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
        if (password !== confirmPassword) {
            Swal.fire({
                title: "รหัสผ่านไม่ตรงกัน",
                text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
                icon: "error",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
            });
            setErrpassword(true);
            setErrconfirmPassword(true);
            return;
        }

        try {
            const res = await dispatch(
                register({
                    Mem_Fname: fname,
                    Mem_Lname: lname,
                    Mem_Username: username,
                    Mem_Password: password,
                    Mem_Email: email,
                    Mem_Tel: tel,
                })
            );

            if (register.fulfilled.match(res)) {
                Swal.fire({
                    title: 'สมัครสมาชิกสำเร็จ!',
                    text: 'ยินดีต้อนรับสู่ระบบ',
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                    timer: 2000,
                    timerProgressBar: true,
                    willClose: () => {
                        navigate('/Login');
                    }
                });

            } else if (register.rejected.match(res)) {
                let msg = res.payload || "ไม่สามารถสมัครสมาชิกได้";

                if (msg === "มีชื่อผู้ใช้นี้ในระบบแล้ว") {
                    msg = "มีชื่อผู้ใช้นี้ในระบบแล้ว";
                }
                Swal.fire({
                    title: 'ผิดพลาด!',
                    text: msg,
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b'
                });
                setUsername("");
                setErrusername(true);
            }

        } catch (err: any) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: err?.message || "ไม่สามารถสมัครสมาชิกได้",
                icon: "error",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
            });
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center min-h-screen w-full bg-gray-50">
                <div className="flex justify-center min-h-screen w-4/5">
                    <section className="flex flex-col p-8 w-full md:w-3/5 xl:w-2/5 rounded-md">
                        <p className="text-3xl font-bold text-center mt-16 mb-6">
                            สมัครสมาชิก
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                            {/* First Name & Last Name */}
                            <div className="flex flex-col md:flex-row justify-center w-full gap-4">
                                {/* First Name */}
                                <div className="w-full md:w-1/2">
                                    <input
                                        className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                    ${errfname
                                                ? 'border-red-500 ring-red-500'
                                                : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                            } 
                           transition-colors`}
                                        type="text"
                                        placeholder="ชื่อ"
                                        value={fname}
                                        maxLength={100}
                                        onChange={(e) => setFname(e.target.value)}
                                        onBlur={() => setErrfname(false)}
                                    />
                                    {errfname && (
                                        <p className="text-red-500 text-xs mt-1">
                                            กรุณากรอกชื่อ
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="w-full md:w-1/2">
                                    <input
                                        className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                            ${errlname
                                                ? 'border-red-500 ring-red-500'
                                                : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                            } 
                           transition-colors`}
                                        type="text"
                                        placeholder="นามสกุล"
                                        value={lname}
                                        maxLength={100}
                                        onChange={(e) => setLname(e.target.value)}
                                        onBlur={() => setErrlname(false)}
                                    />
                                    {errlname && (
                                        <p className="text-red-500 text-xs mt-1">
                                            กรุณากรอกนามสกุล
                                        </p>
                                    )}
                                </div>
                            </div>

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

                            {/* Email */}
                            <div className="w-full">
                                <input
                                    className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                        ${erremail
                                            ? 'border-red-500 ring-red-500'
                                            : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                        } 
                           transition-colors`}
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    maxLength={100}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setErremail(false)}
                                />
                                {erremail && (
                                    <p className="text-red-500 text-xs mt-1">
                                        กรุณากรอกอีเมล
                                    </p>
                                )}
                            </div>

                            {/* Tel */}
                            <div className="w-full">
                                <input
                                    className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                        ${errtel
                                            ? 'border-red-500 ring-red-500'
                                            : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                        } 
                           transition-colors`}
                                    type="text"
                                    placeholder="เบอร์โทรศัพท์"
                                    value={tel}
                                    maxLength={15}
                                    onChange={(e) => setTel(e.target.value)}
                                    onBlur={() => setErrtel(false)}
                                />
                                {errtel && (
                                    <p className="text-red-500 text-xs mt-1">
                                        กรุณากรอกเบอร์โทรศัพท์
                                    </p>
                                )}
                            </div>

                            {/* Password & Confirm Password */}
                            <div className="flex flex-col md:flex-row justify-center w-full gap-4">
                                {/* Password */}
                                <div className="w-full md:w-1/2">
                                    <input
                                        className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                            ${errpassword
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
                                    {errpassword && (
                                        <p className="text-red-500 text-xs mt-1">
                                            กรุณากรอกรหัสผ่าน
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="w-full md:w-1/2">
                                    <input
                                        className={`w-full text-md border p-2 shadow-sm rounded-sm focus:outline-none focus:ring-2
                                            ${errconfirmPassword ? 'border-red-500 ring-red-500'
                                                : 'border-slate-300 focus:border-red-500 focus:ring-red-500'
                                            } 
                           transition-colors`}
                                        type="password"
                                        placeholder="ยืนยันรหัสผ่าน"
                                        value={confirmPassword}
                                        maxLength={20}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onBlur={() => setErrconfirmPassword(false)}
                                    />
                                    {errconfirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">
                                            กรุณายืนยันรหัสผ่าน
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white px-1 py-2 rounded-md hover:bg-red-600 duration-300 hover:cursor-pointer"
                            >
                                สมัครสมาชิก
                            </button>
                        </form>

                        <p className="text-center mt-4">
                            มีบัญชีอยู่แล้ว?{" "}
                            <Link to="/Login"
                                className="text-red-500 hover:text-red-600 font-normal  duration-300"
                            >
                                เข้าสู่ระบบ
                            </Link>
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Register;