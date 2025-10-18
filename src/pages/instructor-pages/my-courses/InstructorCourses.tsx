import { useQuery } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
import toast from "react-hot-toast"
import SpinnerPage from "@/components/spinner-page"
import CourseCard from "@/components/shared/course-card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const InstructorCourses = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: async (): Promise<any> => {
            try {
                const response = (await api.get('/api/instructor/course'));
                if (response.status === 200) {
                    return response.data;
                }
            } catch (err) {
                toast.error("err");
                console.log(err);
            }
        },

    })
    return (
        <div className="w-full">
            {
                isLoading ?
                    <SpinnerPage />
                    :
                    <div className="flex items-center justify-between max-[1081px]:justify-evenly flex-wrap gap-y-4 relative">
                        <Button className="fixed bottom-2 right-6 text-slate-200">
                            <Link to="/instructor/courses/new">Create New One</Link>
                        </Button>
                        {
                            data?.courses.map((e: any) => (
                                <CourseCard course={e} key={e?._id} />
                            ))
                        }
                    </div>

            }
        </div>
    )
}

export default InstructorCourses