import { useContext } from "react"
import { UserContext } from "@/App"
const useUser = () => {
    const context = useContext(UserContext);
    if (context) {
        const { userName, setUserName, role, setRole, isLoading } = context
        return { userName, setUserName, role, setRole, isLoading };
    }
    return false;
}

export default useUser