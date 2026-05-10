import { NavBar } from "../NavBar/Navbar"
import { Outlet } from "react-router-dom"
import { Footer } from "../Shared/Footer"

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}