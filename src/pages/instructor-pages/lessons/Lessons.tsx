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
        <div className="relative h-full space-y-4 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-primary text-xl">Lessons Number {data?.lessons?.length || 0}</span>
                    <FaCirclePlay className="text-primary" />
                </div>
                {
                    (USER && USER.role === "instructor") &&
                    <AddLessonDialog disableButtons={mutation.isPending} onSubmit={(data: lessonType) => { mutation.mutate(data) }} />
                }
            </div>
            <div className="flex items-center flex-wrap gap-3">
                <span>Progress : </span>
                <span>{data?.progress?.progressPercentage}%</span>
                <div className="w-full max-w-[350px] h-2 rounded-full border-[1px] bg-white">
                    <div style={{ width: `${data?.progress?.progressPercentage}%` }} className="bg-primary h-full rounded-full">

                    </div>
                </div>
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
                                    <LessonCard key={e?._id} lesson={e} role={USER && USER.role}
                                        isBookMark={data?.progress?.currentLesson === e?.lessonNumber}
                                        isCompleted={data?.progress?.completedLessons?.includes(e?.lessonNumber)} />
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