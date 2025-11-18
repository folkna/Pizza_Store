import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsCart, findLatestCart } from "../store/cartSlice";
import { type AppDispatch, type RootState } from "../store/store";
import { useNavigate } from "react-router";
import { createOrder, type PostOrder } from "../store/orderSlice";

const Order = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const member = useSelector((state: RootState) => state.auth.member);

    const cart = useSelector((state: RootState) => state.cart.Cart);
    const cart_items = useSelector((state: RootState) => state.cart.cartItems);
    const [sumvalueitem, setSumvalueitem] = useState(0);

    // ดึง cart ล่าสุดของ member
    useEffect(() => {
        if (!member) return;
        dispatch(findLatestCart({ memberId: String(member.memberId) }));
    }, [dispatch, member]);

    // เมื่อ cart ถูกตั้งค่าให้ดึง cart items
    useEffect(() => {
        if (!cart?.Cart_Id) return;
        dispatch(fetchItemsCart({ cartId: cart.Cart_Id }));
    }, [dispatch, cart?.Cart_Id]);

    // คำนวณราคารวม
    useEffect(() => {
        if (cart_items.length === 0) {
            setSumvalueitem(0);
            return;
        }
        const total = cart_items.reduce((acc, ci) => {
            if (ci.product) {
                return acc + ci.product.Product_Price * ci.Cartproduct_Quantity;
            }
            return acc;
        }, 0);
        setSumvalueitem(total);
    }, [cart_items]);

    // ฟังก์ชันยืนยันการสั่งซื้อ
    async function handlesubmit() {
        const result = await Swal.fire({
            title: 'ยืนยันการสั่งซื้อ',
            text: 'คุณต้องการดำเนินการต่อหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#e53e3e',
            cancelButtonColor: '#718096',
        });

        if (result.isConfirmed) {
            const order: PostOrder = {
                cartId: Number(cart?.Cart_Id),
                memberId: String(member?.memberId),
                order_amount: sumvalueitem,
                order_address: String(cart?.address.Address_String),
            };

            await dispatch(createOrder(order));
            await Swal.fire({
                title: 'เพิ่มออเดอร์ของคุณเรียบร้อยแล้ว',
                text: 'กลับหน้าแรก',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#e53e3e',
                willClose: (() => {navigate('/');})
            });

        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-100">
            <main className="flex justify-center flex-1 w-full h-auto p-4 md:p-8 lg:p-12">
                <section className="flex flex-col w-full max-w-3xl p-6 md:p-8   bg-white shadow-xl rounded-2xl gap-6">

                    <p className="text-center font-bold text-3xl text-gray-900">
                        รายละเอียดคำสั่งซื้อ
                    </p>

                    <p className='text-gray-900 text-md font-normal text-end'>ชื่อผู้สั่ง : {member?.memberName}</p>
                    <div>
                        <p className="text-xl font-bold text-gray-900 mb-2">ที่อยู่:</p>
                        <div className="w-full rounded-lg bg-slate-50 border border-slate-200 p-4 shadow-sm">
                            <p className="text-sm font-normal truncate text-slate-700">
                                {cart?.address ? cart.address.Address_String : 'ไม่มี'}
                            </p>
                        </div>
                    </div>

                    <hr className="border-t border-slate-200" />

                    {/* รายการสั่งซื้อ */}
                    <div className="flex-1">
                        <p className="text-xl font-bold text-gray-900 mb-4">
                            รายการสั่งซื้อ:
                        </p>
                        <div className="flex flex-col gap-4">
                            {cart_items.length > 0 ? (
                                cart_items.map((ci, index) => {
                                    const name = ci.product?.Product_Name ?? 'Unknown';
                                    const image = ci.product?.Product_Image ?? '';
                                    const price = ci.product?.Product_Price ?? 0;
                                    const quantity = ci.Cartproduct_Quantity;

                                    return (
                                        <div
                                            className="flex flex-row w-full gap-4 items-center"
                                            key={ci.Cartproduct_Id || index}
                                        >
                                            <img
                                                src={`http://localhost:3000${image}`}
                                                alt={name}
                                                className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                                            />
                                            <div className="flex-1 flex flex-col justify-center">
                                                <p className="text-base font-semibold text-gray-800">
                                                    {name}
                                                </p>
                                                <p className="text-sm text-slate-500">x{quantity}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-lg font-bold text-red-600">
                                                    {(price * quantity).toLocaleString()} บาท
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-base text-slate-500 text-center p-8">
                                    ไม่มีสินค้าในตะกร้า
                                </p>
                            )}
                        </div>
                    </div>

                    <hr className="border-t border-slate-200" />

                    {/* สรุปรายการสั่งซื้อ และ ปุ่มยืนยันการสั่งซื้อ */}
                    <div className="flex flex-col w-full gap-4">

                        {/* รูปแบบการชำระเงิน */}
                        <p className="text-xl font-bold text-gray-900">
                            รูปแบบการชำระเงิน:
                        </p>

                        <select className="w-full rounded-lg bg-white border border-slate-300 shadow-sm placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors p-4">
                            <option value = "เก็บเงินปลายทาง">เก็บเงินปลายทาง</option>
                        </select>

                        {/* สรุปรายการสั่งซื้อ */}
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="flex justify-between text-base text-slate-600">
                                ยอดรวม:
                                <span className="font-semibold text-slate-800">
                                    {sumvalueitem.toLocaleString()} บาท
                                </span>
                            </p>
                            <p className="flex justify-between text-base text-slate-600">
                                ค่าจัดส่ง:
                                <span className="font-semibold text-green-600">ฟรี</span>
                            </p>
                            <hr className="my-2 border-dashed" />
                            <p className="flex justify-between text-xl font-bold text-gray-900">
                                ยอดรวมทั้งหมด:
                                <span className="text-2xl text-red-600">
                                    {sumvalueitem.toLocaleString()} บาท
                                </span>
                            </p>
                        </div>

                        {/* ปุ่มยืนยันการสั่งซื้อ */}
                        <button className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold text-lg  hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mt-4"
                            onClick={() => {handlesubmit()}}>ยืนยันการสั่งซื้อ</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Order;
