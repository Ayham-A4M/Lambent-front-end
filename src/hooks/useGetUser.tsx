import api from "@/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { useState } from "react";

const useGetUser = () => {

    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const queryClient = useQueryClient();
    // useLayoutEffect(() => {
    //     queryClient.prefetchQuery({
    //         queryKey: ['user'],
    //         queryFn: async () => {
    //             const response = await api.get('/api/auth/getUser');
    //             return response.data;
    //         },
    //     })
    // }, [queryClient])
    
    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: async () => {
    //         try {
    //             const response = await api.get('/api/auth/getUser');
    //             if (response.status === 200) {
    //                 setUserName(response?.data?.userName)
    //                 setRole(response?.data?.role);
    //                 return response.data;
    //             }
    //         } catch (err) {
    //             console.log(err, "errr");
    //         }
    //     },
    //     staleTime: 1000 * 60 * 30, // 30 minutes
    //     gcTime: 1000 * 60 * 60, // 1 hour
    // });
    // return { isLoading, userName, setUserName, role, setRole }




     const { data, isLoading, isError, error } = useQuery({
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
        staleTime: 1000 * 60 * 30, // 30 minutes
        gcTime: 1000 * 60 * 60, // 1 hour
    });
    return { isLoading, userName, setUserName, role, setRole }

}

export default useGetUser