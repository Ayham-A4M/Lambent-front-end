import LexicalViewer from "@/components/lexal-editor/lexical-viewer";
import LessonInformation from "@/components/shared/lesson-information"
import SpinnerPage from "@/components/spinner-page";
import { Button } from "@/components/ui/button";
import useGET from "@/hooks/useGet"
import { useLocation, useParams } from "react-router-dom";
import { CheckCircle2Icon } from "lucide-react";
import { handleConfetti } from "@/utils/handleConfetti";
const LessonView = () => {
    const location = useLocation()
    const { lessonId, courseId } = useParams();
    const { data, isLoading } = useGET(`/api/user/courses/${courseId}/lessons/${lessonId}`, []);
    const { lesson } = location.state;
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
                                viewsNumber: data?.lesson?.viewsNumber
                            }}
                        />
                        {
                            data?.lesson &&
                            <LexicalViewer jsonState={data?.lesson?.lessonContent} key={data?.lesson?._id} />
                        }
                        <div className="flex py-3 justify-end items-center">
                            <Button className="bg-green-400 cursor-pointer" onClick={() => {handleConfetti()}}>
                                <CheckCircle2Icon />
                                complete the lessson
                            </Button>
                        </div>
                    </div>
            }
        </>
    )
}
export default LessonView