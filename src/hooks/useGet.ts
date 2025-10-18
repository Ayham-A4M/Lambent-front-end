import { useQuery } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor";
const useGET = (endpoint: string, queryKeys: string[]) => {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys,
        queryFn: async () => {
            try {
                const response = await api.get(endpoint);
                return response.data;

            } catch (err) {
                console.log(err, "errr");
            }
        },
        staleTime: 0
    });
    return { data, isLoading }

}

export default useGET