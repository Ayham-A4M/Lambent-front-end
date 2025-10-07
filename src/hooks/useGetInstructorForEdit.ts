import { useQuery } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor";
const useGetInstructorForEdit = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: [],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/admin/instructor/${id}`);
                return response.data;

            } catch (err) {
                console.log(err, "errr");
            }
        },
    });
    return { data, isLoading }

}

export default useGetInstructorForEdit