import api from "@/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

const useGetUser = () => {

    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");



    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const response = await api.get('/api/auth/getUser');
                if (response.status === 200) {
                    setUserName(response?.data?.userName)
                    setRole(response?.data?.role);
                    return response.data;
                }
            } catch (err) {
                console.log(err, "errr");
            }
        },
    });
    return { isLoading, userName, setUserName, role, setRole }

}

export default useGetUser