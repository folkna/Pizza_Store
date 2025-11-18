import { FaBars } from "react-icons/fa"

interface HeaderDashboardProps {
    shownav: boolean;
    setShownav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header_Dashboard : React.FC<HeaderDashboardProps> = ({shownav,setShownav}) => {
    return (
        <>
            {/* ส่วนหัวของแดชบอร์ด */}
            <section className="w-full h-16 bg-slate-200 flex items-center justify-between px-6 shadow-md ">
                <h1 className="text-black text-2xl font-semibold tracking-wide">
                    Dashboard
                </h1>

                {/* ปุ่มแสดงเมนูด้านข้างบนมือถือ */}
                <div className="flex lg:hidden items-center justify-center p-3 bg-white rounded-sm shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-110" onClick={() => setShownav(!shownav)}  >
                    <FaBars size={20} className="text-red-500" />
                </div>
            </section>
        </>
    )
}

export default Header_Dashboard