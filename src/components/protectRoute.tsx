import useUser from "@/hooks/useUser"
// import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom"
const ProtectRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const USER = useUser();
    // const navigator = useNavigate();
    if (!USER?.user?.role) { return <Navigate to={"/login-signup"} replace /> }
    if (!allowedRoles.includes(USER?.user?.role)) {
        return <Navigate to={"/jjjj"} replace />
    }
    if (allowedRoles.includes(USER?.user?.role)) {
        return <Outlet />
    }
}

export default ProtectRoute