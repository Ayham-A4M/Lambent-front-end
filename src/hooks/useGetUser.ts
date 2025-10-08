import compareTwoDate from "@/helper/compareTwoDate";
import api from "@/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

const useGetUser = () => {

    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [isThereStreakToday, setIsThereStreakToday] = useState<boolean>(false)



    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const response = await api.get('/api/auth/getUser');
                if (response.status === 200) {
                    setUserName(response?.data?.userName)
                    setRole(response?.data?.role);
                    if (response.data?.lastDateStreak) {
                        // parseInt((today - lastDateStreak) / (1000 * 60 * 60 * 24))
                        console.log(Math.floor((new Date().setHours(0,0,0,0) - new Date(response.data?.lastDateStreak).setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)),"test")
                        setIsThereStreakToday(compareTwoDate(new Date(response.data?.lastDateStreak),new Date()))
                    }
                    return response.data;
                }
            } catch (err) {
                console.log(err, "errr");
            }
        },
    });
    return { isLoading, userName, setUserName, role, setRole,isThereStreakToday,setIsThereStreakToday }

}

export default useGetUser