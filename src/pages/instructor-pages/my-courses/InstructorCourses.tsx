import { useQuery } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
import toast from "react-hot-toast"
import Spinner from "@/components/ui/spinner"
import { demoCourses } from "@/components/shared/course-card"
import CourseCard from "@/components/shared/course-card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const InstructorCourses = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: async (): Promise<any> => {
            try {
                const response = (await api.get('/api/instructor/courses'));
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
                    <div className="flex items-center justify-center h-[calc(100vh-96px)]">
                        <Spinner talwindSize="size-10"/>
                    </div>
                :
                <div className="flex items-center justify-between max-[1081px]:justify-evenly flex-wrap gap-y-4 relative">
                    <Button className="fixed bottom-2 right-6 text-slate-200">
                        <Link to="/instructor/courses/new">Create New One</Link>
                    </Button>
                    {
                        demoCourses.map((e)=>(
                            <CourseCard course={e}/>
                        ))
                    }
                </div>

            }
        </div>
    )
}

export default InstructorCourses