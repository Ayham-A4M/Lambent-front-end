import api from "@/utils/axiosInterceptor";
import { useQuery } from "@tanstack/react-query"

import { useState } from "react";

const useGetInstructors = () => {

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(1);
    const { data, isLoading } = useQuery({
        queryKey: ['instructors', page],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/admin/instructors/?page=${page}`);
                if (response.status === 200) {
                    if (response.data?.limit) {
                        setLimit(response.data?.limit)
                    }
                    return response.data;
                }
            } catch (err) {
                console.log(err, "errr");
            }
        },
    });
    return { isLoading, data, page, setPage, limit }

}

export default useGetInstructors