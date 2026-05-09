import { NavBar } from "../NavBar/Navbar"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-slate-950">
            <NavBar />
            <main className="mx-auto max-w-7xl p-6 lg:p-8">
                <Outlet />
            </main>
        </div>
    )
}