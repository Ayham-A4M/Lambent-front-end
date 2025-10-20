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
import { useMutation } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
import toast from "react-hot-toast"
const DashboardLayout = () => {
    const USER = useUser();
    const mutation = useMutation({
        mutationFn: async (): Promise<any> => { return (await api.put('/api/user/streak')).data },
        onSuccess: (data: any) => {
            toast.success(data?.msg || "you collect the streak for today");
            if (USER) {
                USER?.setIsThereStreakToday(true);
            }
        },
        onError: (err) => { console.log(err) }
    })
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0 overflow-x-hidden">
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
                        <div className="pr-4 flex items-center gap-3">
                            {
                                (!USER?.isThereStreakToday && !USER?.isLoading) &&
                                <span className="text-[.8rem] animate-pulse text-primary">Clim your streak</span>
                            }
                            <button disabled={USER && USER?.isThereStreakToday} name="streak-button" className="cursor-pointer"
                                onClick={() => { mutation.mutate() }}
                            ><FaFire className={`${USER?.isThereStreakToday ? "text-orange-400" : "text-gray-500"} text-xl`} />
                            </button>
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