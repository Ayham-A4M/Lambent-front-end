import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import useUser from "@/hooks/useUser"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { FaFire } from "react-icons/fa";
const DashboardLayout = () => {
    const USER = useUser()
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <h1 className="font-extrabold BitcountText">Hey {USER && USER?.userName}</h1>
                    </div>
                    {
                        (USER && USER?.role === "user") &&
                        <div className="pr-4">
                            <FaFire className={`text-gray-500 text-xl`} />
                        </div>
                    }

                </header>
                <div className="flex flex-1 flex-col gap-4 p-2 md:p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout