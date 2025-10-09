import { useQuery } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
import { useNavigate } from "react-router-dom"
const useGetLessons = (courseId: string | undefined) => {
    const navigate = useNavigate();
    if (!courseId) {
        navigate("/instructors/courses", { replace: true })
    }
    const { data, isLoading } = useQuery({
        queryKey: ["lessons"],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/instructor/course/${courseId}/lesson`)
                return response.data;
            } catch (err) {
                console.log(err);
            }
        }
    })
    return { data, isLoading }
}

export default useGetLessons