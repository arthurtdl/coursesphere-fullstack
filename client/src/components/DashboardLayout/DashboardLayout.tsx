import { NavBar } from "../NavBar/Navbar"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}