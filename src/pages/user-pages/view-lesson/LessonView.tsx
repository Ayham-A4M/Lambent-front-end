import LexicalViewer from "@/components/lexal-editor/lexical-viewer";
import LessonInformation from "@/components/shared/lesson-information"
import SpinnerPage from "@/components/spinner-page";
import { Button } from "@/components/ui/button";
import useGET from "@/hooks/useGet"
import { Link, useParams } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";
import { handleConfetti } from "@/utils/handleConfetti";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
import { FaQuestion } from "react-icons/fa";
const LessonView = () => {
    const { lessonId, courseId } = useParams();
    const { data, isLoading } = useGET(`/api/user/courses/${courseId}/lessons/${lessonId}`, ["lesson"]);
    const { mutation } = usePUT(`/api/user/progress/${courseId}`, { completedLessonNumber: data?.lesson?.lessonNumber }, [], handleConfetti)
    return (
        <>
            {
                isLoading ?
                    <SpinnerPage />
                    :

                    <div className="space-y-3">

                        <LessonInformation
                            lesson={{
                                name: data?.lesson?.name,
                                lessonNumber: data?.lesson?.lessonNumber,
                                description: data?.lesson?.description,
                            }}
                        />
                        {
                            mutation?.isSuccess &&
                            <div className="flex justify-end">
                                <div className="py-2 px-3 text-xl font-bold text-green-400 rounded-[2px] flex items-center gap-2">
                                    Completed
                                    <CheckCircle2Icon className="size-6" />
                                </div>
                            </div>
                        }
                        {
                            data?.lesson &&
                            <LexicalViewer jsonState={data?.lesson?.lessonContent} key={data?.lesson?._id} />
                        }

                        {
                            data?.hasQuizz &&
                            <Link to={`/courses/${courseId}/lessons/${lessonId}/quiz`} className="relative w-full">
                                <Button className="border-3 group mt-3 bg-white relative cursor-pointer  border-orange-400 text-orange-400 font-extrabold" variant="outline">
                                    <span className="group-hover:text-slate-100 z-20 duration-400 ">Take Quiz</span>
                                    <div className="absolute left-0 w-0 duration-300 z-0    h-full bg-orange-400 group-hover:w-full"></div>
                                    <FaQuestion className="absolute size-4  -top-2 -right-1 rotate-[-30deg] origin-bottom-right     duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                                </Button>
                            </Link>
                        }
                        {
                            !mutation?.isSuccess &&
                            <div className="flex py-3 justify-end items-center">
                                {

                                    <Button disabled={mutation?.isPending || mutation?.isSuccess} className="bg-green-400 cursor-pointer font-bold" onClick={() => { mutation?.mutate() }}>
                                        {
                                            mutation?.isPending ?
                                                <>
                                                    wait a moment <Spinner talwindSize="size-5" />
                                                </>
                                                :
                                                <>
                                                    <CheckCircle2Icon />
                                                    complete the lessson
                                                </>
                                        }
                                    </Button>
                                }
                            </div>
                        }

                    </div>
            }
        </>
    )
}
export default LessonView