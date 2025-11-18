import { FaPizzaSlice, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Dashboard = ( ) => {
    const employee = useSelector((state: RootState) => state.authemp.employee);

    return (
        <section className="flex w-full bg-slate-100 p-4 gap-4 justify-center">
            <main className="flex flex-col w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                
                {/* ส่วนหัวของ Dashboard */}
                <div className="flex flex-col items-center gap-4 mb-6 md:mb-8">
                    <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                        <FaPizzaSlice size={40} className="text-red-600" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-2xl md:text-3xl text-gray-900 mb-2">
                            ยินดีต้อนรับสู่ระบบ Dashboard
                        </p>
                        <p className="text-xl md:text-2xl font-semibold text-red-600">
                            Pizza Store
                        </p>
                    </div>
                </div>

                {/* ส่วนยินดีต้อนรับพนักงาน */}
                <div className="flex items-center justify-center gap-3 py-6 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                    <FaUserCircle size={32} className="text-gray-600" />
                    <p className="text-lg md:text-xl text-gray-700">
                        สวัสดีคุณ <span className="font-bold text-red-600">{employee?.employeeName || "ผู้ใช้งาน"}</span>
                    </p>
                </div>

                {/* ส่วนแสดงรายละเอียด */}
                <div className="border-t border-slate-200 pt-6">
                    <p className="text-base md:text-lg text-gray-600 text-center leading-relaxed">
                        ที่นี่คุณสามารถจัดการข้อมูลพนักงาน สินค้า คำสั่งซื้อ และตรวจสอบรายงานต่าง ๆ ได้อย่างสะดวกและรวดเร็ว
                    </p>
                    <p className = "text-red-600 text-center text-lg font-bold mt-2">วันที่ {new Date().toLocaleDateString('th-TH')}</p>
                </div>

            </main>
        </section>
    );
};

export default Dashboard;