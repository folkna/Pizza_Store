import Banner from '../../../../pizza_store/picture/pizza_hero.jpg';
import Product_Details from './Product_Details';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { type AppDispatch} from '../store/store';
import { findLatestCart, fetchItemsCart } from '../store/cartSlice';
import { fetchLogin } from '../store/authSlice';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    // โหลดข้อมูลสมาชิกและตะกร้าสินค้าเมื่อหน้า Home โหลด
    useEffect(() => {
        const fetchlogin = async () => {
            try {
                const member = await dispatch(fetchLogin()).unwrap();

                if (member?.memberId) {
                    const latestCart = await dispatch(
                        findLatestCart({ memberId: String(member.memberId) })
                    ).unwrap();

                    if (latestCart?.Cart?.Cart_Id) {
                        await dispatch(fetchItemsCart({ cartId: latestCart.Cart.Cart_Id }));
                    }
                }
            } catch (err) {
                console.error("ไม่สามารถโหลดข้อมูลได้", err);
            }
        };

        fetchlogin();
    }, [dispatch]);

    return (
        <>
            <section className="relative w-full hidden md:flex md:h-[550px] bg-gray-100">
                
                {/* Background Image */}
                <img
                    src={Banner}
                    alt="Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay สีดำโปร่ง */}
                <div className="absolute inset-0 bg-opacity-30"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-32">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        ยินดีต้อนรับสู่ร้านของเรา
                    </h1>
                    <p className="text-white text-lg md:text-2xl mb-6 max-w-xl">
                        ลิ้มรสพิซซ่าอร่อย สดใหม่ พร้อมโปรโมชั่นพิเศษทุกวัน
                    </p>
                </div>
            </section>

            <Product_Details />
        </>
    )
}

export default Home;