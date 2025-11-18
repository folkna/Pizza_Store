import { Link, useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { deleteAddress, fetchAddressByMemberId } from "../../store/addressSlice";
import { findLatestCart, updateCartAddress } from "../../store/cartSlice";
import { FaTrash } from "react-icons/fa";

const Address_Details = () => {
    const dispatch = useDispatch<AppDispatch>();
    const member = useSelector((state: RootState) => state.auth.member);
    const address = useSelector((state: RootState) => state.address.Address);
    const [address_id, setAddress_id] = useState("");
    const navigate = useNavigate();

    // ดึงที่อยู่ของสมาชิกเมื่อ component โหลด
    useEffect(() => {
        if (member?.memberId) {
            dispatch(fetchAddressByMemberId(Number(member.memberId)));
        }
    }, [dispatch])

    // อัพเดตที่อยู่ในตะกร้าสินค้า
    async function updateaddresscart() {
        try {
            const res = await dispatch(findLatestCart({ memberId: String(member?.memberId) })).unwrap();

            // ถ้าไม่พบ cart
            if (!res || !res.Cart) {
                return;
            }

            const cart_id = res.Cart.Cart_Id;
            await dispatch(updateCartAddress({ cartId: cart_id, addressId: Number(address_id) }))
                .then(() => {
                    Swal.fire({
                        title: 'เลือกที่อยู่เสร็จสิ้น',
                        text: 'กลับไปยังหน้าแรก',
                        icon: 'success',
                        confirmButtonText: 'ตกลง',
                        confirmButtonColor: '#e7605b',
                        timer: 2000,
                        timerProgressBar: true,
                        willClose: () => { navigate("/"); }
                    });
                })

        } catch (error: any) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาดในการเลือกที่อยู่',
                icon: 'error',
                confirmButtonText: 'ตกลง',
                confirmButtonColor: '#e7605b',
                timer: 2000,
            });
        }
    }

    // ลบที่อยู่
    async function removeaddress(address_id: number) {
        const result = await Swal.fire({
            title: "ยืนยันการลบ",
            text: "คุณต้องการลบที่อยู่นี้หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E53E3E",
            cancelButtonColor: "#718096",
            confirmButtonText: "ลบ",
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            await dispatch(deleteAddress(address_id))
                .then(() => {
                    Swal.fire({
                        title: 'ลบที่อยู่เสร็จสิ้น',
                        icon: 'success',
                        confirmButtonText: 'ตกลง',
                        confirmButtonColor: '#e7605b',
                        timer: 2000,
                    });
                    dispatch(findLatestCart({ memberId: String(member?.memberId)}));
                })
        }
    }

    return (
        <>
            <section className="flex flex-col min-h-screen bg-slate-100">
                <section className="flex flex-col w-full items-center flex-1 gap-4 p-4 md:p-8">
                    <div className="flex flex-col justify-center items-center w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl shadow-xl">

                        <p className="text-3xl font-bold text-gray-900 mb-2">ข้อมูลที่อยู่</p>
                        <p className="text-lg font-semibold text-slate-700 mb-6 self-start">
                            ที่อยู่ที่บันทึกไว้
                        </p>

                        <div className="flex flex-col w-full overflow-y-auto gap-4">

                            {/*/ แสดงที่อยู่ทั้งหมด */}
                            {address.map((addr, index) => (
                                <div
                                    key={addr.Address_Id}
                                    className={`group flex flex-col w-full p-4 rounded-xl bg-white shadow-sm transition-all duration-300 border-2 
                                        ${address_id === String(addr.Address_Id)
                                            ? 'border-red-600 ring-2 ring-red-100 shadow-md'
                                            : 'border-slate-200 hover:border-red-400 hover:shadow-md'
                                        } cursor-pointer space-y-1`} onClick={() => setAddress_id(String(addr.Address_Id))}>
                                            
                                    <div className="flex items-center justify-between">
                                        <label htmlFor={`address${index}`} className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                            ที่อยู่ {index + 1}
                                        </label>
                                        <div className="flex justify-between items-center gap-4">
                                            <FaTrash className=" hover:text-red-600" onClick={() => { removeaddress(addr.Address_Id) }} />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        {addr.Address_String}
                                    </p>
                                </div>
                            ))}

                            {/* เพิ่มที่อยู่ใหม่ */}
                            <Link to="/Address_Select" className="flex w-full p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-red-400 hover:bg-red-50 transition-all duration-300 cursor-pointer mt-4">
                                <div className="flex flex-row justify-center items-center gap-2 text-slate-600 w-full group-hover:text-red-600">
                                    <FaPlus size={16} className="text-red-500" />
                                    <p className="text-sm font-semibold">เพิ่มที่อยู่ของคุณ</p>
                                </div>
                            </Link>

                            <hr className="border-t border-slate-200 my-6 w-full" />

                            {/* ปุ่มเลือกที่อยู่ */}
                            <button
                                className="w-full md:w-3/4 self-center bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 
                                           px-4 py-3 duration-300 font-semibold text-lg
                                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                                           disabled:bg-slate-300 disabled:cursor-not-allowed"
                                onClick={updateaddresscart}
                                disabled={!address_id}
                            >
                                เลือกที่อยู่นี้
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Address_Details;