import useGetLessons from "@/hooks/useGetLessons"
import { useParams } from "react-router-dom"
import SpinnerPage from "@/components/spinner-page"
import AddLessonDialog, { type lessonType } from "@/components/dialogs/add-lesson-dialog"
import { useMutation } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
import toast from "react-hot-toast"
const Lessons = () => {
    const { courseId } = useParams()
    const { data, isLoading } = useGetLessons(courseId)
    const lessonMutation = useMutation({
        mutationFn: async (data: lessonType) => ((await api.post(`/api/instructor/course/${courseId}/lesson`, data)).data),
        onSuccess: (data) => {
            toast.success(data?.msg || "lesson has been created successfully");
       
        },
        onError: (err) => {
            console.log(err);
        }
    })
    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <span className="text-primary text-xl">Lessons Number {data?.lessons?.lenght || 0}</span>
                <AddLessonDialog disableButtons={lessonMutation.isPending} onSubmit={(data:lessonType) => { lessonMutation.mutate(data) }} />

            </div>
            {
                isLoading
                    ?
                    <SpinnerPage />
                    :
                    data?.lessons?.lenght > 0
                        ?
                        data?.lessons?.map((e: any) => (
                            <span>hello world</span>
                        ))
                        :
                        <span>no lessons</span>
            }
        </div>
    )
}

export default Lessons