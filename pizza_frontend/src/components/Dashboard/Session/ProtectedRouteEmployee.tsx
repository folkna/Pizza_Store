import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchLoginemployee } from "../../store/employeeauthSlice";

const ProtectedRouteEmployee = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading= useSelector((state: RootState) => state.auth.loading);
  const employee = useSelector((state: RootState) => state.authemp.employee);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await dispatch(fetchLoginemployee()).unwrap();

        if (!res.loggedIn) {
          Swal.fire({
            title: "กรุณาเข้าสู่ระบบ",
            text: "คุณต้องเข้าสู่ระบบก่อนเข้าถึงหน้านี้",
            icon: "warning",
            confirmButtonText: "ตกลง",
            confirmButtonColor: '#e7605b',
          }).then(() => navigate("/Employee_Login"));
        }
      } catch (err) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถตรวจสอบสถานะการเข้าสู่ระบบได้",
          icon: "error",
          confirmButtonText: "ตกลง",
        }).then(() => navigate("/Employee_Login"));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return <div className=" flex flex-row justify-center items-center text-xl font-bold bg-white opacity-90">กำลังตรวจสอบข้อมูล...</div>;
  }

  if (employee && employee.loggedIn) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRouteEmployee;