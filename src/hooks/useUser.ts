import { useContext } from "react"
import { UserContext } from "@/App"

const useUser = () => {
    const context = useContext(UserContext);
    if (context) {
        const { userName, setUserName, role, setRole, isLoading, isThereStreakToday, setIsThereStreakToday } = context
        return { userName, setUserName, role, setRole, isLoading, isThereStreakToday, setIsThereStreakToday };
    }
    return false;
}

export default useUser