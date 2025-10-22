import LexicalViewer from "@/components/lexal-editor/lexical-viewer";
import LessonInformation from "@/components/shared/lesson-information"
import SpinnerPage from "@/components/spinner-page";
import { Button } from "@/components/ui/button";
import useGET from "@/hooks/useGet"
import { useLocation, useParams } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";
import { handleConfetti } from "@/utils/handleConfetti";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
const LessonView = () => {
    const location = useLocation()
    const { lessonId, courseId } = useParams();
    const { data, isLoading } = useGET(`/api/user/courses/${courseId}/lessons/${lessonId}`, ["lesson"]);
    const { lesson } = location.state;
    const { mutation } = usePUT(`/api/user/progress/${courseId}`, { completedLessonNumber: lesson?.lessonNumber }, [], handleConfetti)
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
                                lessonNumber: lesson?.lessonNumber,
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
                            !mutation?.isSuccess &&
                            <div className="flex py-3 justify-end items-center">
                                {

                                    <Button disabled={mutation?.isPending || mutation?.isSuccess} className="bg-green-400 cursor-pointer" onClick={() => { mutation?.mutate() }}>

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