import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FaHome, FaUsers, FaUserTie, FaBox, FaShoppingCart, FaTruck, FaDoorOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store/store";
import { Logout } from "../store/employeeauthSlice";
import Swal from "sweetalert2";

interface HeaderDashboardProps {
    shownav: boolean;
    setShownav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav_Dashboard: React.FC<HeaderDashboardProps> = ({ shownav, setShownav }) => {
    const navRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // click outside เพื่อปิด mobile menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setShownav(false);
            }
        }

        if (shownav) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [shownav]);

    // ฟังก์ชันออกจากระบบ
    async function logout() {
        try {
            await dispatch(Logout());

            await Swal.fire({
                icon: "success",
                title: "ออกสู่ระบบเรียบร้อย",
                text: "กลับสู่หน้าเข้าสู่ระบบ",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
            });

            setShownav(false);

            navigate("/Employee_Login");
        } catch (err) {
        }
    }

    return (
        <>

            {/* Mobile menu */}
            <div
                ref={navRef}
                className={`fixed top-0 left-0 right-0 h-[45vh] bg-white shadow-2xl rounded-t-2xl p-6 flex flex-col z-50 transition-transform duration-300 ease-in-out
          lg:hidden
          ${shownav ? "-translate-y-0" : "-translate-y-full"}`}
            >
                <p className = "text-xl font-bold mb-3">เมนู Dashboard</p>
                <Link to="/Dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaHome size={20} /> หน้าหลัก
                </Link>
                <Link to="/Dashboard/Member" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaUsers size={20} /> สมาชิก
                </Link>
                <Link to="/Dashboard/Employee" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaUserTie size={20} /> พนักงาน
                </Link>
                <Link to="/Dashboard/Product" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaBox size={20} /> สินค้า
                </Link>
                <Link to="/Dashboard/Order" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaShoppingCart size={20} /> การสั่งซื้อ
                </Link>
                <Link to="/Dashboard/Delivery" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300">
                    <FaTruck size={20} /> การขนส่ง
                </Link>
                <hr className="border-t-1 border-red-600 w-full mb-2" />
                <Link to="/Employee_Login" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-200 transition duration-300" onClick={() => logout()}>
                    <FaDoorOpen size={20} /> ออกจากระบบ
                </Link>
            </div>

            {/* Desktop sidebar */}
            <nav className="hidden lg:flex flex-col w-[250px] bg-red-600 min-h-screen h-auto shadow-lg p-4 rounded-md text-white">
                <div className="flex flex-col items-center justify-center h-[120px] mb-4">
                    <p className="text-3xl font-bold">Pizza Store</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Link to="/Dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaHome size={20} /> หน้าหลัก
                    </Link>
                    <hr className="border-t-1 border-white w-full" />
                    <Link to="/Dashboard/Member" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaUsers size={20} /> สมาชิก
                    </Link>
                    <Link to="/Dashboard/Employee" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaUserTie size={20} /> พนักงาน
                    </Link>
                    <hr className="border-t-1 border-white w-full" />
                    <Link to="/Dashboard/Product" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaBox size={20} /> สินค้า
                    </Link>
                    <Link to="/Dashboard/Order" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaShoppingCart size={20} /> การสั่งซื้อ
                    </Link>
                    <Link to="/Dashboard/Delivery" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700">
                        <FaTruck size={20} /> การขนส่ง
                    </Link>
                    <hr className="border-t-1 border-white w-full" />
                    <Link to="/Employee_Login" className="flex items-center gap-3 p-3 rounded-md hover:bg-red-700" onClick={() => logout()}>
                        <FaDoorOpen size={20} /> ออกจากระบบ
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Nav_Dashboard;
