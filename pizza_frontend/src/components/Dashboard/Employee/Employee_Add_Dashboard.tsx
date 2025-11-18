import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { type EmployeeForm } from "../../store/employeeSlice";
import { type AppDispatch } from "../../store/store";
import { addEmployee } from "../../store/employeeSlice";

const Employee_Add_Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();

    // Form state
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [hnumber, setHnumber] = useState("");
    const [alley, setAlley] = useState("");
    const [village, setVillage] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const [province, setProvince] = useState("");
    const [poscode, setPoscode] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [workyear, setWorkyear] = useState(2025);
    const [salary, setSalary] = useState(15000);
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Error state
    const [errfname, setErrfname] = useState(false);
    const [errlname, setErrlname] = useState(false);
    const [errhnumber, setErrhnumber] = useState(false);
    const [erralley, setErralley] = useState(false);
    const [errvillage, setErrvillage] = useState(false);
    const [errstreet, setErrstreet] = useState(false);
    const [errdistrict, setErrdistrict] = useState(false);
    const [errsubdistrict, setErrsubdistrict] = useState(false);
    const [errprovince, setErrprovince] = useState(false);
    const [errposcode, setErrposcode] = useState(false);
    const [errtel, setErrtel] = useState(false);
    const [erremail, setErremail] = useState(false);
    const [errrole, setErrrole] = useState(false);
    const [errworkyear, setErrworkyear] = useState(false);
    const [errsalary, setErrsalary] = useState(false);
    const [errstatus, setErrstatus] = useState(false);
    const [errusername, setErrusername] = useState(false);
    const [errpassword, setErrpassword] = useState(false);

    const navigate = useNavigate();

    // ฟังก์ชันจัดการการส่งฟอร์ม
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        let hasError = false;

        // ชื่อ
        if (fname.trim() === "") {
            setErrfname(true);
            hasError = true;
        } else {
            setErrfname(false);
        }

        // นามสกุล
        if (lname.trim() === "") {
            setErrlname(true);
            hasError = true;
        } else {
            setErrlname(false);
        }

        // เลขที่บ้าน
        if (hnumber.trim() === "") {
            setErrhnumber(true);
            hasError = true;
        } else {
            setErrhnumber(false);
        }

        // ตรอก/ซอย
        if (alley.trim() === "") {
            setErralley(true);
            hasError = true;
        } else {
            setErralley(false);
        }

        // หมู่บ้าน
        if (village.trim() === "") {
            setErrvillage(true);
            hasError = true;
        } else {
            setErrvillage(false);
        }

        // ถนน
        if (street.trim() === "") {
            setErrstreet(true);
            hasError = true;
        } else {
            setErrstreet(false);
        }

        // เขต/อำเภอ
        if (district.trim() === "") {
            setErrdistrict(true);
            hasError = true;
        } else {
            setErrdistrict(false);
        }

        // แขวง/ตำบล
        if (subdistrict.trim() === "") {
            setErrsubdistrict(true);
            hasError = true;
        } else {
            setErrsubdistrict(false);
        }

        // จังหวัด
        if (province.trim() === "") {
            setErrprovince(true);
            hasError = true;
        } else {
            setErrprovince(false);
        }

        // รหัสไปรษณีย์
        if (poscode.trim() === "") {
            setErrposcode(true);
            hasError = true;
        } else {
            setErrposcode(false);
        }

        // เบอร์โทร
        if (tel.trim() === "") {
            setErrtel(true);
            hasError = true;
        } else {
            setErrtel(false);
        }

        // Email
        if (email.trim() === "") {
            setErremail(true);
            hasError = true;
        } else {
            setErremail(false);
        }

        // บทบาท
        if (role.trim() === "") {
            setErrrole(true);
            hasError = true;
        } else {
            setErrrole(false);
        }

        // สถานะ
        if (status.trim() === "") {
            setErrstatus(true);
            hasError = true;
        } else {
            setErrstatus(false);
        }


        // อายุงาน
        if (isNaN(workyear) || workyear <= 0) {
            setErrworkyear(true);
            hasError = true;
        } else {
            setErrworkyear(false);
        }

        // เงินเดือน
        if (isNaN(salary) || salary <= 0) {
            setErrsalary(true);
            hasError = true;
        } else {
            setErrsalary(false);
        }

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

        if (hasError) return; // ถ้ามี error ไม่ต้องส่ง

        try {
            const employee: EmployeeForm = {
                Emp_Fname: fname,
                Emp_Lname: lname,
                Emp_Hnumber: hnumber,
                Emp_Alley: alley,
                Emp_Village: village,
                Emp_Street: street,
                Emp_District: district,
                Emp_Subdistrict: subdistrict,
                Emp_Province: province,
                Emp_Poscode: poscode,
                Emp_Tel: tel,
                Emp_Email: email,
                Emp_Role: role,
                Emp_Workyear: workyear,
                Emp_Salary: salary,
                Emp_Status: status,
                Emp_Username: username,
                Emp_Password: password,
            }

            const resultAction = await dispatch(addEmployee(employee));

            if (addEmployee.rejected.match(resultAction)) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: "Username ซ้ำกับในระบบ",
                    timer: 2000,
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#e7605b',
                    timerProgressBar: true
                });
                setUsername("");
                setErrusername(true);
                return;
            }

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'เพิ่มข้อมูลพนักงานเรียบร้อย',
                timer: 2000,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timerProgressBar: true,
                willClose: () => { navigate("/Dashboard/Employee"); }
            });

        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: "ไม่สามารถเพิ่มพนักงานได้",
                timer: 2000,
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timerProgressBar: true
            });
        }
    }

    return (
        <>
            <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
                <main className="flex flex-col w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                    <p className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8">
                        เพิ่มข้อมูลพนักงาน
                    </p>

                    <form className="flex flex-col gap-6 w-full" onSubmit={handlesubmit}>
                        {/* Role */}
                        <div className="w-full">
                            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                                บทบาท
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                onBlur={() => setErrrole(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white
                                    ${errrole ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            >
                                <option value="">-- เลือกบทบาท --</option>
                                <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
                                <option value="ผู้จัดการ">ผู้จัดการ</option>
                                <option value="พนักงาน">พนักงาน</option>
                            </select>
                            {errrole && <p className="text-red-500 text-xs mt-1">กรุณาเลือกบทบาท</p>}
                        </div>

                        {/* Status */}
                        <div className="w-full">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                                สถานะ
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={() => setErrrole(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white
                                    ${errstatus ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            >
                                <option value="">-- เลือกสถานะ --</option>
                                <option value="ปกติ">ปกติ</option>
                                <option value="ถูกระงับ">ถูกระงับ</option>
                                <option value="ลาออก">ลาออก</option>
                            </select>
                            {errstatus && <p className="text-red-500 text-xs mt-1">กรุณาเลือกสถานะ</p>}
                        </div>

                        {/* Name & Surname */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* Firstname */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="fname" className="block text-sm font-medium text-slate-700 mb-2">
                                    ชื่อ
                                </label>
                                <input
                                    id="fname"
                                    type="text"
                                    placeholder="กรอกชื่อ"
                                    maxLength={100}
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    onBlur={() => setErrfname(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errfname ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errfname && <p className="text-red-500 text-xs mt-1">กรุณากรอกชื่อ</p>}
                            </div>

                            {/* Lastname */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="lname" className="block text-sm font-medium text-slate-700 mb-2">
                                    นามสกุล
                                </label>
                                <input
                                    id="lname"
                                    type="text"
                                    placeholder="กรอกนามสกุล"
                                    value={lname}
                                    maxLength={100}
                                    onChange={(e) => setLname(e.target.value)}
                                    onBlur={() => setErrlname(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errlname ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errlname && <p className="text-red-500 text-xs mt-1">กรุณากรอกนามสกุล</p>}
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* House Number */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="hnumber" className="block text-sm font-medium text-slate-700 mb-2">
                                    เลขที่บ้าน
                                </label>
                                <input
                                    id="hnumber"
                                    type="text"
                                    placeholder="กรอกเลขที่บ้าน"
                                    value={hnumber}
                                    maxLength={10}
                                    onChange={(e) => setHnumber(e.target.value)}
                                    onBlur={() => setErrhnumber(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errhnumber ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errhnumber && <p className="text-red-500 text-xs mt-1">กรุณากรอกเลขที่บ้าน</p>}
                            </div>

                            {/* Alley */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="alley" className="block text-sm font-medium text-slate-700 mb-2">
                                    ตรอก/ซอย
                                </label>
                                <input
                                    id="alley"
                                    type="text"
                                    placeholder="กรอกตรอก/ซอย"
                                    value={alley}
                                    maxLength={100}
                                    onChange={(e) => setAlley(e.target.value)}
                                    onBlur={() => setErralley(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${erralley ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {erralley && <p className="text-red-500 text-xs mt-1">กรุณากรอกตรอก/ซอย</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* Village */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="village" className="block text-sm font-medium text-slate-700 mb-2">
                                    หมู่บ้าน
                                </label>
                                <input
                                    id="village"
                                    type="text"
                                    placeholder="กรอกหมู่บ้าน"
                                    value={village}
                                    maxLength={100}
                                    onChange={(e) => setVillage(e.target.value)}
                                    onBlur={() => setErrvillage(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errvillage ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errvillage && <p className="text-red-500 text-xs mt-1">กรุณากรอกหมู่บ้าน</p>}
                            </div>

                            {/* Street */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="street" className="block text-sm font-medium text-slate-700 mb-2">
                                    ถนน
                                </label>
                                <input
                                    id="street"
                                    type="text"
                                    placeholder="กรอกถนน"
                                    value={street}
                                    maxLength={100}
                                    onChange={(e) => setStreet(e.target.value)}
                                    onBlur={() => setErrstreet(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errstreet ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errstreet && <p className="text-red-500 text-xs mt-1">กรุณากรอกถนน</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* District */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
                                    เขต/อำเภอ
                                </label>
                                <input
                                    id="district"
                                    type="text"
                                    placeholder="กรอกเขต/อำเภอ"
                                    value={district}
                                    maxLength={100}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    onBlur={() => setErrdistrict(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errdistrict ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errdistrict && <p className="text-red-500 text-xs mt-1">กรุณากรอกเขต/อำเภอ</p>}
                            </div>

                            {/* Subdistrict */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="subdistrict" className="block text-sm font-medium text-slate-700 mb-2">
                                    แขวง/ตำบล
                                </label>
                                <input
                                    id="subdistrict"
                                    type="text"
                                    placeholder="กรอกแขวง/ตำบล"
                                    value={subdistrict}
                                    maxLength={100}
                                    onChange={(e) => setSubdistrict(e.target.value)}
                                    onBlur={() => setErrsubdistrict(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errsubdistrict ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errsubdistrict && <p className="text-red-500 text-xs mt-1">กรุณากรอกแขวง/ตำบล</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* Province */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="province" className="block text-sm font-medium text-slate-700 mb-2">
                                    จังหวัด
                                </label>
                                <input
                                    id="province"
                                    type="text"
                                    placeholder="กรอกจังหวัด"
                                    value={province}
                                    maxLength={100}
                                    onChange={(e) => setProvince(e.target.value)}
                                    onBlur={() => setErrprovince(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errprovince ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errprovince && <p className="text-red-500 text-xs mt-1">กรุณากรอกจังหวัด</p>}
                            </div>

                            {/* Postal Code */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="poscode" className="block text-sm font-medium text-slate-700 mb-2">
                                    รหัสไปรษณีย์
                                </label>
                                <input
                                    id="poscode"
                                    type="text"
                                    placeholder="กรอกรหัสไปรษณีย์"
                                    value={poscode}
                                    maxLength={15}
                                    onChange={(e) => setPoscode(e.target.value)}
                                    onBlur={() => setErrposcode(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errposcode ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errposcode && <p className="text-red-500 text-xs mt-1">กรุณากรอกรหัสไปรษณีย์</p>}
                            </div>
                        </div>

                        {/* Tel */}
                        <div className="w-full">
                            <label htmlFor="tel" className="block text-sm font-medium text-slate-700 mb-2">
                                เบอร์โทร
                            </label>
                            <input
                                id="tel"
                                type="tel"
                                placeholder="กรอกเบอร์โทร"
                                value={tel}
                                maxLength={15}
                                onChange={(e) => setTel(e.target.value)}
                                onBlur={() => setErrtel(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                    ${errtel ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            />
                            {errtel && <p className="text-red-500 text-xs mt-1">กรุณากรอกเบอร์โทร</p>}
                        </div>

                        {/* Email */}
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                อีเมล
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="กรอกอีเมล"
                                value={email}
                                maxLength={100}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setErremail(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                    ${erremail ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            />
                            {erremail && <p className="text-red-500 text-xs mt-1">กรุณากรอกอีเมล</p>}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            {/* Work Year */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="workyear" className="block text-sm font-medium text-slate-700 mb-2">
                                    ปีที่เริ่มทำงาน
                                </label>
                                <input
                                    id="workyear"
                                    type="number"
                                    placeholder="กรอกปีที่เริ่มทำงาน"
                                    defaultValue={workyear}
                                    onChange={(e) => setWorkyear(Number(e.target.value))}
                                    onBlur={() => setErrworkyear(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errworkyear ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errworkyear && <p className="text-red-500 text-xs mt-1">กรุณากรอกปีที่เริ่มทำงาน</p>}
                            </div>

                            {/* Salary */}
                            <div className="w-full md:flex-1">
                                <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-2">
                                    เงินเดือน (บาท)
                                </label>
                                <input
                                    id="salary"
                                    type="number"
                                    placeholder="กรอกเงินเดือน"
                                    defaultValue={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                    onBlur={() => setErrsalary(false)}
                                    className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                        ${errsalary ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                                />
                                {errsalary && <p className="text-red-500 text-xs mt-1">กรุณากรอกเงินเดือน</p>}
                            </div>
                        </div>

                        {/* Username */}
                        <div className="w-full">
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                ชื่อผู้ใช้งาน
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="กรอกชื่อผู้ใช้งาน"
                                value={username}
                                maxLength={10}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => setErrusername(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                    ${errusername ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            />
                            {errusername && <p className="text-red-500 text-xs mt-1">กรุณากรอกชื่อผู้ใช้งาน</p>}
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                รหัสผ่าน
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="กรอกรหัสผ่าน"
                                value={password}
                                maxLength={15}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setErrpassword(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                                    ${errpassword ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}
                            />
                            {errpassword && <p className="text-red-500 text-xs mt-1">กรุณากรอกรหัสผ่าน</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 
                            text-white rounded-lg shadow-md duration-300 font-semibold
                            focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        >
                            เพิ่มพนักงาน
                        </button>
                    </form>
                </main>
            </section>
        </>
    );
};

export default Employee_Add_Dashboard;