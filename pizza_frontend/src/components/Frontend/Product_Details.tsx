import { FaShoppingBasket } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { type RootState, type AppDispatch } from '../store/store';
import { fetchAll, fetchCategories } from '../store/productSlice';
import { addToCart} from '../store/cartSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Product_Details = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.product.Product)
    const filterproduct = product.filter((p) => p.Product_Quantity > 0 && p.Product_Status === 'ปกติ');
    const categories = useSelector((state: RootState) => state.product.Category);
    const member = useSelector((state: RootState) => state.auth.member)

    useEffect(() => {
        dispatch(fetchAll());
        dispatch(fetchCategories())
    }, [dispatch])

    // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
    async function addcartitems(productid: number) {
        if (!member?.memberId) {
            Swal.fire({
                icon: "warning",
                title: "กรุณาเข้าสู่ระบบ",
                text: "คุณต้องเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า",
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#e7605b',
                willClose: () => { navigate("/Login"); }
            });
            return;
        }

        await dispatch(addToCart({ id: productid, memberId: String(member.memberId) }))
            .unwrap() 
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มสินค้าลงตะกร้าแล้ว",
                    text: "คุณได้เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    confirmButtonColor: '#e7605b',
                });
            })
            .catch((error: any) => {
                Swal.fire({
                    icon: "warning", 
                    title: "ไม่สามารถเพิ่มสินค้าได้",
                    text: error || "เกิดข้อผิดพลาดในการเพิ่มข้อมูลลงรถเข็น",
                    confirmButtonColor: '#e7605b'
                });
            });
    }
    return (
        <section className="flex md:justify-center bg-slate-100 w-full min-h-screen p-4 md:p-8 lg:p-12">
            <section className="w-full lg:w-4/5 2xl:w-3/5 bg-white rounded-lg">
                <div className="grid grid-cols-1 gap-8 md:gap-4">

                    {/* แสดงสินค้าตามหมวดหมู่ */}
                    {categories.map((cat) => {
                        const filteredProducts = filterproduct.filter(
                            (p) => p.category.Category_Id === cat.Category_Id
                        );

                        if (filteredProducts.length === 0) return null;

                        return (

                            <div
                                key={cat.Category_Id}
                                className="bg-white overflow-hidden">
                                <h2
                                    id={cat.Category_Name}
                                    className="text-3xl font-semibold tracking-tight p-6 md:p-8 border-b border-red-500">
                                    {cat.Category_Name}
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8">
                                    {filteredProducts.map((p) => (
                                        <div
                                            key={p.Product_Id}
                                            className="relative bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden 
                                 transition-all duration-300 group hover:shadow-lg"
                                        >
                                            {/* รูปภาพสินค้า */}
                                            <img
                                                src={`http://localhost:3000${p.Product_Image}`}
                                                alt={p.Product_Name}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />

                                            {/* รายละเอียดสินค้า */}
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-slate-800 truncate">
                                                    {p.Product_Name}
                                                </h3>
                                                <p className="text-base text-gray-600 mt-1">
                                                    ราคา:{' '}
                                                    <span className="font-bold text-red-600 text-lg">
                                                       {p.Product_Price.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                                                    </span>
                                                </p>
                                            </div>

                                            {/* ปุ่มเพิ่มลงตะกร้า */}
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 
                                   flex justify-center items-center opacity-0 group-hover:opacity-100 
                                   transition-all duration-300 cursor-pointer"
                                            >
                                                <button
                                                    id={String(p.Product_Id)}
                                                    className="text-white px-5 py-2.5 rounded-lg flex items-center gap-2 
                                     bg-red-600 hover:bg-red-700 
                                     transition-all duration-300 transform scale-90 group-hover:scale-100 cursor-pointer"
                                                    onClick={() => {
                                                        addcartitems(p.Product_Id);
                                                    }}
                                                >
                                                    <FaShoppingBasket /> เพิ่มลงรถเข็น
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </section>
    )
}

export default Product_Details;