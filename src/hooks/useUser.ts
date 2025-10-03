import { useContext } from "react"
import { UserContext } from "@/App"
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        return;
    }
    const { user, setUser } = context
    return { user, setUser }
}

export default useUser