import useUser from "@/hooks/useUser"
// import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom"
const ProtectRoute = ({ allowedRole }: { allowedRole: string }) => {
    const USER = useUser();
    if (!USER) { return <Navigate to={'/login-signup'} replace /> }
    if (USER?.isLoading) {
        return <div className="w-full h-screen flex items-center justify-center"><h1>Loading....</h1></div>
    }

    if (allowedRole !== USER?.role) {
        console.log("not allowed showed not allowed page");
        return <Navigate to={"/login-signup"} replace />
    }
    if (allowedRole === USER?.role) {
        return <Outlet />
    }
    return <Navigate to={"/login-signup"} replace />
}

export default ProtectRoute