import { useParams } from "react-router-dom"
import SpinnerPage from "@/components/spinner-page"
import AddLessonDialog, { type lessonType } from "@/components/dialogs/lesson-dialog"
import { FaCirclePlay } from "react-icons/fa6";
import LessonCard from "@/components/shared/lesson-card"
import useUser from "@/hooks/useUser"
import lessonMutation from "./handler/lesson-mutation"
import useGET from "@/hooks/useGet";
const Lessons = () => {
    const USER = useUser();
    const { courseId } = useParams()
    const { data, isLoading } = useGET(`/api/${USER && USER?.role}/courses/${courseId}/lessons`, ["lessons"]);
    const mutation = lessonMutation(courseId);
    return (
        <div className="relative h-full ">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-primary text-xl">Lessons Number {data?.lessons?.length || 0}</span>
                    <FaCirclePlay className="text-primary" />
                </div>
                {
                    (USER && USER.role === "instructor") &&
                    <AddLessonDialog disableButtons={mutation.isPending} onSubmit={(data: lessonType) => { mutation.mutate(data) }} />
                }
            </div>


            {
                isLoading
                    ?
                    <SpinnerPage />
                    :
                    (data?.lessons?.length > 0 && USER)
                        ?
                        <div className="flex items-center justify-between gap-8 md:justify-start flex-wrap">
                            {
                                data?.lessons?.map((e: any) => (
                                    <LessonCard key={e?._id} lesson={e} role={USER && USER.role} />
                                ))
                            }

                        </div>
                        :
                        <span>no lessons</span>
            }
        </div>
    )
}

export default Lessons