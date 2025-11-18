import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
import {useDispatch , useSelector } from "react-redux";
import {type RootState , type AppDispatch } from "../store/store";
import { useState,useEffect } from "react";



export default function FrontendLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const cart_items = useSelector((state: RootState) => state.cart.cartItems)
  const [cartcount, Setcartcount] = useState(0);
  const isLogin = useSelector((state: RootState) => state.auth.member?.loggedIn)
  const [showcart, Setshowcart] = useState(false);
  const member = useSelector((state: RootState) => state.auth.member)

  useEffect(() => {
    let count = 0;
    cart_items.forEach((item) => {count += item.Cartproduct_Quantity})
    Setcartcount(count);
  }, [dispatch, cart_items]);

  return (
    <>
      <Header Setshowcart={Setshowcart} showcart={showcart} isLogin={!!isLogin} cartcount={cartcount} member_name={String(member?.memberName)} />
      <Cart showcart={showcart} Setshowcart={Setshowcart} />
      <main className="flex flex-col justify-center w-full bg-white">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}