import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from '../store/store';
import { findLatestCart, fetchItemsCart, updateCartItemQuantity, removeCartItem } from '../store/cartSlice';

// แสดงตะกร้าสินค้า
interface CartProp {
  showcart: boolean,
  Setshowcart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProp> = ({ showcart, Setshowcart }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentCart = useSelector((state: RootState) => state.cart.Cart);
  const cart_items = useSelector((state: RootState) => state.cart.cartItems);
  const member = useSelector((state: RootState) => state.auth.member);
  const hascart_item = cart_items && cart_items.length > 0;
  const navRef = useRef<HTMLDivElement>(null);
  const [sumvalueitem, setSumvalueitem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // หาตะกร้าล่าสุดของสมาชิก
  useEffect(() => {
    if (member?.memberId) {
      dispatch(findLatestCart({ memberId: String(member.memberId) }));
    }
  }, [dispatch, member?.memberId]);

  // ดึงรายการสินค้าของตะกร้า
  useEffect(() => {
    if (currentCart?.Cart_Id) {
      dispatch(fetchItemsCart({ cartId: currentCart.Cart_Id }));
    }
  }, [dispatch, currentCart?.Cart_Id]);

  // คำนวณยอดรวมสินค้าในตะกร้า
  useEffect(() => {
    if (cart_items && cart_items.length > 0) {
      const totalSum = cart_items.reduce(
        (acc, item) => acc + item.product.Product_Price * item.Cartproduct_Quantity,
        0
      );
      setSumvalueitem(totalSum);
    } else {
      setSumvalueitem(0);
    }
  }, [dispatch, cart_items]);

  // ปิดตะกร้าสินค้าเมื่อคลิกนอกตะกร้า
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        Setshowcart(false);
      }
    }
    if (showcart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showcart]);

  // อัพเดตจำนวนสินค้าชิ้นนั้นในตะกร้า
  const updateitemquantity = async (id: number, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ id: id, newQuantity: newQuantity }));
  };

  // ลดจำนวนสินค้า
  const decreasequantity = (id: number) => {
    const item = cart_items.find((ci) => ci.Cartproduct_Id === id);
    if (!item || item.Cartproduct_Quantity <= 1) return;
    updateitemquantity(id, item.Cartproduct_Quantity - 1);
  };

  // เพิ่มจำนวนสินค้า
  const increasequantity = (id: number) => {
    const item = cart_items.find((ci) => ci.Cartproduct_Id === id);
    if (!item) return;
    const maxQuantity = item.product?.Product_Quantity || 0;
    if (item.Cartproduct_Quantity >= maxQuantity) return;
    updateitemquantity(id, item.Cartproduct_Quantity + 1);
  };

  // ลบสินค้าออกจากตะกร้า
  const removefromcart = async (cart_items_id: number) => {
    if (isLoading) return;
    const result = await Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณต้องการลบสินค้าชิ้นนี้จากตะกร้าหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E53E3E",
      cancelButtonColor: "#718096",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        dispatch(removeCartItem({ id: cart_items_id }));

        if (currentCart?.Cart_Id) {
          dispatch(fetchItemsCart({ cartId: currentCart.Cart_Id }));
        }
        Swal.fire({
          title: "ลบแล้ว!",
          text: "สินค้าถูกลบจากตะกร้าแล้ว",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบสินค้าได้",
          confirmButtonColor: '#e7605b'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ดำเนินการสั่งซื้อ
  const handlecheckout = () => {
    if (!member) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเข้าสู่ระบบ",
        text: "คุณต้องเข้าสู่ระบบก่อนทำการสั่งซื้อ",
        confirmButtonColor: '#e7605b'
      });
      return;
    }

    if (!hascart_item) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีสินค้าในตะกร้า",
        text: "กรุณาเพิ่มสินค้าลงในตะกร้าก่อน",
        confirmButtonColor: '#e7605b'
      });
      return;
    }

    if (!currentCart?.address) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกที่อยู่",
        text: "กรุณาเลือกที่อยู่สำหรับจัดส่งสินค้า",
        confirmButtonColor: '#e7605b'
      });
      return;
    }

    // ตรวจสอบ stock ของทุก item
    const outOfStockItems = cart_items.filter(
      (item) => item.Cartproduct_Quantity > item.product.Product_Quantity
    );

    if (outOfStockItems.length > 0) {
      Swal.fire({
        icon: "error",
        title: "สินค้าบางรายการเกินจำนวน",
        text: `โปรดนำสินค้าออกก่อน`,
        confirmButtonColor: "#E53E3E",
      });
      return;
    }

    Setshowcart(false);
    navigate("/Order");
  };

  return (
    <>
      {/* Sidebar Cart */}
      <div
        ref={navRef}
        className={`fixed z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out
          flex flex-col bottom-0 left-0 right-0 w-full h-[70vh] rounded-t-2xl p-6
          ${showcart ? "translate-y-0" : "translate-y-full"}
          md:top-0 md:right-0 md:left-auto md:w-[370px] md:h-full md:rounded-l-2xl md:rounded-t-none
          ${showcart ? "md:translate-x-0" : "md:translate-y-0 md:translate-x-full"}`}>

        <div className="flex flex-col w-full h-full">

          {/* Address */}
          <div className="flex-shrink-0 mb-4">
            <p className="text-xl mb-3 font-bold text-gray-900">ที่อยู่จัดส่ง</p>
            {member ? (
              <>
                {currentCart?.address ? (
                  <div className="border border-slate-200 flex flex-col p-4 rounded-xl">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {currentCart.address.Address_String}
                    </p>
                  </div>
                ) : (
                  <div className="text-slate-500 p-4 border border-dashed rounded-xl text-center text-sm">
                    กรุณาเลือกที่อยู่
                  </div>
                )}
                <Link
                  to="/Address"
                  className="w-full text-center p-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <FaPlus size={16} className="text-red-600" />
                  เลือกที่อยู่อื่น
                </Link>
              </>
            ) : (
              <Link
                to="/Login"
                className="w-full text-center p-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <FaPlus size={16} />
                เข้าสู่ระบบเพื่อเลือกที่อยู่
              </Link>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 flex-col gap-4 overflow-y-auto scrollbar-hidden">
            <p className="text-xl font-bold text-gray-900 mb-3">รายการสั่งซื้อ</p>
            {hascart_item ? (
              cart_items.map((ci,index) => {
                const name = ci.product.Product_Name;
                const image = ci.product.Product_Image;
                const price = ci.product.Product_Price;
                const quantity = ci.Cartproduct_Quantity;
                const maxQuantity = ci.product.Product_Quantity || 0;

                return (
                  <div className="flex flex-col w-full" key={ci.Cartproduct_Id}>
                    <div className="flex flex-row w-full gap-4">
                      <img
                        src={`http://localhost:3000${image}`}
                        alt={name}
                        className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                        onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2">{name}</p>
                        {quantity > cart_items[index].product.Product_Quantity && (
                          <p className="text-red-500 text-sm">
                            จำนวนสินค้าเกิน stock ที่มี
                          </p>
                        )}
                        <p className="text-base text-red-600 font-bold mt-1">{price.toLocaleString()} บาท</p>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex justify-between w-full pt-3 items-center mb-2">
                      <button
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => removefromcart(ci.Cartproduct_Id)}
                        disabled={isLoading}
                      >
                        ลบ
                      </button>
                      <div className="flex flex-row items-center gap-2">
                        <button
                          className="w-7 h-7 flex items-center justify-center enabled:bg-red-500 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:bg-slate-200  disabled:cursor-not-allowed"
                          onClick={() => decreasequantity(ci.Cartproduct_Id)}
                          disabled={quantity <= 1 || isLoading}
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold w-8 text-center text-sm">{quantity}</span>
                        <button
                          className="w-7 h-7 flex items-center justify-center enabled:bg-red-500 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:bg-slate-200 disabled:cursor-not-allowed"
                          onClick={() => increasequantity(ci.Cartproduct_Id)}
                          disabled={quantity >= maxQuantity || isLoading}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-32 w-full text-base text-slate-500 p-4">
                <p>ไม่มีสินค้าในตะกร้า</p>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {hascart_item && (
            <div className="flex-shrink-0 sticky bottom-0 -mb-6 -mx-6 px-6 pt-4 pb-6 bg-white border-t border-slate-200 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-sm flex justify-between text-slate-600">
                  ยอดรวม: <span className="font-semibold text-slate-800">{sumvalueitem.toLocaleString()} บาท</span>
                </p>
                <p className="text-sm flex justify-between text-slate-600">
                  ค่าจัดส่ง: <span className="font-semibold text-green-600">ฟรี</span>
                </p>
                <hr className="my-2 border-dashed" />
                <p className="text-lg font-bold flex justify-between text-gray-900">
                  ยอดรวมทั้งหมด: <span className="text-red-600">{sumvalueitem.toLocaleString()} บาท</span>
                </p>
              </div>
              <button
                className="w-full p-3 bg-red-600 text-white hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg font-semibold"
                onClick={handlecheckout}
                disabled={isLoading || !hascart_item}
              >
                {isLoading ? "กำลังดำเนินการ..." : `ยืนยันการสั่งซื้อ (${sumvalueitem.toLocaleString()} ฿)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
