import { Outlet } from "react-router";
import Header_Dashboard from "./Header_Dashboard";
import Nav_Dashboard from "./Nav_Dashboard";
import { useState } from "react";

export default function DashboardLayout() {
  const [shownav , setShownav] =  useState(false);
  return (
    <div className="flex min-h-screen gap-4 p-4">
        <Nav_Dashboard shownav = {shownav} setShownav={setShownav}/>
      <div className="flex-1 flex flex-col">
        <Header_Dashboard shownav = {shownav} setShownav={setShownav}/>
        <main className="p-2 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
