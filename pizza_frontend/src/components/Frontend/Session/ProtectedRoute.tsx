import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { fetchLogin } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading= useSelector((state: RootState) => state.auth.loading);
  const member = useSelector((state: RootState) => state.auth.member);

  useEffect(() => {
    const checkauth = async () => {
      try {
        const res = await dispatch(fetchLogin()).unwrap();

        if (!res.loggedIn) {
          Swal.fire({
            title: "กรุณาเข้าสู่ระบบ",
            text: "คุณต้องเข้าสู่ระบบก่อนเข้าถึงหน้านี้",
            icon: "warning",
            confirmButtonText: "ตกลง",
            confirmButtonColor: '#e7605b',
          }).then(() => navigate("/Login"));
        }
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถตรวจสอบสถานะการเข้าสู่ระบบได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        }).then(() => navigate("/Login"));
      }
    };

    checkauth();
  }, [dispatch, navigate]);

  if (loading) {
    return <div className=" flex flex-row justify-center items-center text-xl font-bold bg-white opacity-90">กำลังตรวจสอบข้อมูล...</div>;
  }

  if (member && member.loggedIn) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;