import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { fetchCategories, fetchproductbyid, updateProduct } from "../../store/productSlice";

const Product_Update_Dashboard = () => {
    const { id } = useParams<{ id: string }>();
    console.log
    const [product, setProduct] = useState<any>({});
    const dispatch = useDispatch<AppDispatch>();

    // Form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [unitcost, setUnitcost] = useState(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Error state
    const [errname, setErrname] = useState(false);
    const [errprice, setErrprice] = useState(false);
    const [errquantity, setErrquantity] = useState(false);
    const [errstatus, setErrstatus] = useState(false);
    const [errunitcost, setErrunitcost] = useState(false);
    const [errcategory, setErrcategory] = useState(false);

    const categories = useSelector((state: RootState) => state.product.Category)

    const [image, setImage] = useState("");

    const navigate = useNavigate();

    // ดึงหมวดหมู่ทั้งหมด
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    // ดึง product ตาม id
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                // เรียก dispatch + unwrap
                const product = await dispatch(fetchproductbyid({ id: id })).unwrap();

                // ตรวจสอบว่า product มี Product_Id
                if (product?.Product_Id) {
                    setProduct(product);
                    setName(product.Product_Name);
                    setPrice(product.Product_Price);
                    setQuantity(product.Product_Quantity);
                    setUnitcost(product.Product_Unitcost)
                    setStatus(product.Product_Status);
                    setCategory(String(product.category?.Category_Id) || "");
                    setImage(product.Product_Image);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [id]);

    // ฟังก์ชันจัดการการส่งฟอร์ม
    async function handlesubmit(e: React.FormEvent) {
        e.preventDefault();

        let hasError = false;

        if (name.trim() === "") {
            setErrname(true);
            hasError = true;
        } else {
            setErrname(false);
        }

        if (isNaN(Number(price)) || price < 0) {
            setErrprice(true);
            hasError = true;
        } else {
            setErrprice(false);
        }


        if (isNaN(Number(quantity)) || quantity < 0) {
            setErrquantity(true);
            hasError = true;
        } else {
            setErrquantity(false);
        }

        if (status.trim() === "") {
            setErrstatus(true);
            hasError = true;
        } else {
            setErrstatus(false);
        }

        if (category.trim() === "") {
            setErrcategory(true);
            hasError = true;
        } else {
            setErrcategory(false);
        }

        if (hasError) return;

        try {
            const formData = new FormData();
            formData.append("Product_Name", name);
            formData.append("Product_Price", price ? Number(price).toString() : "0");
            formData.append("Product_Unitcost", price ? Number(unitcost).toString() : "0");
            formData.append("Product_Quantity", quantity ? Number(quantity).toString() : "0");
            formData.append("Product_Status", status);
            formData.append("category", category ? Number(category).toString() : "0");

            if (imageFile) {
                formData.append("image", imageFile);
            }

            await dispatch(updateProduct({ Product_Id: Number(id), formData: formData })).then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "แก้ไขข้อมูลสินค้าเรียบร้อย",
                    timer: 2000,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#e7605b",
                    timerProgressBar: true,
                    willClose: () => {
                        navigate("/Dashboard/Product");
                    },
                });
            })

        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาดในการแก้ไขข้อมูลสินค้า",
                timer: 2000,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#e7605b",
                timerProgressBar: true,
            });
        }
    }

    return (
        <section className="flex w-full min-h-screen bg-slate-100 p-4 gap-4 justify-center">
            {product.Product_Id ? (
                <main className="flex flex-col w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-8">

                    <p className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 md:mb-8">
                        แก้ไขข้อมูลสินค้าหมายเลข {product.Product_Id}
                    </p>

                    <form
                        className="flex flex-col gap-6 w-full"
                        onSubmit={handlesubmit}>

                        {/* Name */}
                        <div className="w-full">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                ชื่อสินค้า
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="กรอกชื่อสินค้า"
                                value={name}
                                maxLength={150}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setErrname(false)}

                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                  ${errname ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500" // 9. [แก้ไข] ปรับ border
                                    }`}
                            />
                            {errname && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณากรอกชื่อสินค้า
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="w-full">
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                                ราคา
                            </label>
                            <input
                                id="price"
                                type="number"
                                placeholder="กรอกราคา"
                                defaultValue={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                onBlur={() => setErrprice(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                  ${errprice ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`} />
                            {errprice && (
                                <p className="text-red-500 text-xs mt-1">กรุณากรอกราคา</p>
                            )}
                        </div>

                        {/* Unitcost */}
                        <div className="w-full">
                            <label htmlFor="unitcost" className="block text-sm font-medium text-slate-700 mb-2">
                                ราคาต้นทุนต่อชิ้น
                            </label>
                            <input
                                id="unitcost"
                                type="number"
                                placeholder="กรอกราคาต้นทุนต่อชิ้น"
                                defaultValue={unitcost}
                                onChange={(e) => setUnitcost(Number(e.target.value))}
                                onBlur={() => setErrunitcost(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                  ${errunitcost ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`} />
                            {errunitcost && (
                                <p className="text-red-500 text-xs mt-1">กรุณากรอกราคาต้นทุนต่อชิ้น</p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="w-full">
                            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">
                                จำนวน
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                placeholder="กรอกจำนวนสินค้า"
                                defaultValue={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                onBlur={() => setErrquantity(false)}
                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white placeholder:text-slate-400
                  ${errquantity ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"
                                    }`}
                            />
                            {errquantity && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณากรอกจำนวนสินค้า
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="w-full">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                                สถานะสินค้า
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={() => setErrstatus(false)}
                                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 bg-white
                  ${errstatus ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}>
                                <option value="">-- เลือกสถานะสินค้า --</option>
                                <option value="ปกติ">ปกติ</option>
                                <option value="ไม่พร้อมทำการ">ไม่พร้อมทำการ</option>
                            </select>
                            {errstatus && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณาเลือกสถานะสินค้า
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="w-full">
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                หมวดหมู่สินค้า
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                onBlur={() => setErrcategory(false)}

                                className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 bg-white
                  ${errcategory ? "border-red-500 ring-red-500" : "border-slate-300 focus:border-red-500 focus:ring-red-500"}`}>
                                <option value="">-- เลือกหมวดหมู่สินค้า --</option>
                                {categories.map((cat) => (
                                    <option key={cat.Category_Id} value={cat.Category_Id}>
                                        {cat.Category_Name}
                                    </option>
                                ))}
                            </select>
                            {errcategory && (
                                <p className="text-red-500 text-xs mt-1">
                                    กรุณาเลือกหมวดหมู่
                                </p>
                            )}
                        </div>

                        {/* Image */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                รูปภาพสินค้า
                            </label>
                            <div className="mb-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                    />
                                ) : product.Product_Image ? (
                                    <img
                                        src={`http://localhost:3000${product.Product_Image}`}
                                        alt="Current"
                                        className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-lg border border-dashed border-slate-300 flex items-center justify-center">
                                        <p className="text-sm text-slate-500">ไม่มีรูปภาพ</p>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImageFile(e.target.files[0]);
                                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                                    }
                                }}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-red-50 file:text-red-700
                  hover:file:bg-red-100"/>
                        </div>

                        {/* ปุ่มบันทึก */}
                        <button
                            type="submit"
                            className="mt-6 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 
                         text-white rounded-lg shadow-md duration-300 font-semibold
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        >
                            บันทึกการเปลี่ยนแปลง
                        </button>
                    </form>
                </main>
            ) : null}
        </section>
    );
};

export default Product_Update_Dashboard;
