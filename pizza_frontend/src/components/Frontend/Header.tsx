import { Link, useLocation } from "react-router";
import { FaBars, FaShoppingCart, FaSignOutAlt, FaTruck, FaUser, FaUserAlt } from "react-icons/fa";
import logo from "../../../../pizza_store/picture/logo.webp";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Logout } from "../store/authSlice";
import { type AppDispatch, type RootState } from "../store/store";
import Swal from "sweetalert2";

interface HeaderProps {
  isLogin: boolean;
  cartcount: number;
  showcart: boolean;
  Setshowcart: React.Dispatch<React.SetStateAction<boolean>>;
  member_name: string,
}

export default function Header({ isLogin, cartcount, showcart, Setshowcart, member_name }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef<HTMLDivElement>(null);
  const [showmenu, setShowmenu] = useState(false);
  const member = useSelector((state: RootState) => state.auth.member);

  // กำหนดหน้าไหนจะโชว์ปุ่ม
  const hideOnPaths = ["/Login", "/Register", '/Address_Select', '/Order', "/Employee_Login"];
  const showCartButton = !hideOnPaths.includes(currentPath);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowmenu(false);
      }
    }
    if (showmenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showmenu]);

  async function logout() {
    try {
      dispatch(Logout());

      Swal.fire({
        icon: "success",
        title: "ออกสู่ระบบเรียบร้อย",
        text: "กลับสู่หน้าเข้าสู่ระบบ",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setShowmenu(false);

      navigate("/Login");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "ออกสู่ระบบไม่สำเร็จ",
        text: err as string || "เกิดข้อผิดพลาดบางอย่าง",
        timer: 1500,
        confirmButtonColor: "#e7605b",
        showConfirmButton: false,
      });
    }
  }

  return (
    <>

      {member?.loggedIn &&

      // เมนูด้านข้าง เมื่อจอเล็ก
        <div
          ref={navRef}
          className={`fixed z-60 bg-white shadow-2xl transition-all duration-300 ease-in-out
  flex flex-col top-0 left-0 w-full h-[35vh] md:h-[70vh] rounded-t-2xl p-6
  ${showmenu ? "-translate-y-0" : "-translate-y-full"}
  md:top-0 md:left-0 md:w-[370px] md:h-full md:rounded-r-2xl md:rounded-t-none
  ${showmenu ? "md:translate-x-0" : "md:translate-y-0 md:-translate-x-full"}`}>

          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">เมนู</h2>
            <h2 className="text-md font-bold text-gray-800 mb-4 flex flex-row items-center gap-2 line-clamp-1 "><FaUserAlt />ชื่อผู้ใช้งาน : {member_name}</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex flex-row items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all duration-200" onClick={() => { navigate("/Member_Account") }}>
                <FaUser className="text-red-600 text-lg" />
                <span className="text-gray-700 font-medium">บัญชี</span>
              </li>

              <li className="flex flex-row items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all duration-200" onClick={() => { navigate("/Member_Order") }}>
                <FaTruck className="text-red-600 text-lg" />
                <span className="text-gray-700 font-medium">ออเดอร์</span>
              </li>

              <li className="flex flex-row items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all duration-200" onClick={() => { logout() }}>
                <FaSignOutAlt className="text-red-600 text-lg" />
                <span className="text-gray-700 font-medium">ออกจากระบบ</span>
              </li>
            </ul>
          </div>
        </div>
      }

      {/* แถบเมนูด้านบน */}
      <nav className="sticky top-0 flex items-center justify-between gap-4 w-full font-semibold bg-white text-black p-2 px-10 shadow-gray-200 shadow-md text-md z-50">
        {member?.loggedIn &&
          <div className="flex flex-row items-center p-3 bg-gray-100 shadow-md text-black hover:bg-red-500 duration-300 rounded-md gap-2" onClick={() => setShowmenu(!showmenu)}>
            <FaBars />
          </div>
        }
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:text-red-500 duration-200">
              หน้าหลัก
            </Link>
          </li>
          <li>
          </li>
        </ul>

        <div className="flex-1 flex flex-row justify-center">
          <img src={logo} className="h-20 object-fit" alt="logo" />
        </div>

        {/* ปุ่มตะกร้าสินค้า และ ปุ่มเข้าสู่ระบบ */}
        {showCartButton ? (
          <div className="flex flex-row gap-3 items-center">
            {isLogin ? (
              <>
                <button
                  className="flex flex-row items-center p-3 bg-gray-100 shadow-md text-black hover:bg-red-500 duration-300 rounded-md gap-2"
                  onClick={() => Setshowcart(!showcart)}
                >
                  <FaShoppingCart />
                  <p>{cartcount > 99 ? "99+" : cartcount} รายการ</p>
                </button>
              </>
            ) : (
              <Link
                to="/Login"
                className="flex flex-row items-center p-3 bg-gray-100 shadow-md text-black hover:bg-red-500 duration-300 rounded-md gap-2"
              >
                <FaUser />
                <p>เข้าสู่ระบบ</p>
              </Link>
            )}
          </div>
        ) : (<div className="flex flex-row px-13"><div></div></div>)
        }
      </nav >
    </>
  );
}
