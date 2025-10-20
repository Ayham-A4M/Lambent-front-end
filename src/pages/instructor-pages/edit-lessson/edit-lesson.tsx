import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import useGET from "@/hooks/useGet";
import SpinnerPage from "@/components/spinner-page";
import LexicalEditor from "@/components/lexal-editor";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
import LessonInformation from "@/components/shared/lesson-information";
const EditLesson = () => {
    const location = useLocation()
    const { lessonId, courseId } = useParams();
    const { data, isLoading } = useGET(`/api/instructor/courses/${courseId}/lessons/${lessonId}`, []);
    const { lesson } = location.state;
    const [jsonState, setJsonState] = useState<string>("");
    const { mutation } = usePUT(`/api/instructor/courses/${courseId}/lessons/${lessonId}`, { lessonContent: jsonState }, ["lesson"]);
    useEffect(() => {
        console.log("arraived data :)", data?.lesson?.lessonContent);
        setJsonState("");
        if (data?.lesson?.lessonContent) {
            setJsonState(JSON.parse(data?.lesson?.lessonContent));
        }
    }, [data])
    return (
        <>
            {
                isLoading ?
                    <SpinnerPage />
                    :
                    <div className="space-y-3">
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
                                data?.lesson?.lessonContent !== jsonState &&
                                <div className="flex items-center justify-end">
                                    <Button onClick={() => { mutation?.mutate() }} className="cursor-pointer">
                                        {
                                            mutation.isPending ?
                                                <Spinner talwindSize="size-5" />
                                                :
                                                "save changes"
                                        }
                                    </Button>
                                </div>
                            }

                        </div>

                        {
                            data?.lesson &&
                            <LexicalEditor key={data?.lesson?._id} jsonState={jsonState} onChange={setJsonState} />
                        }


                    </div>
            }

        </ >
    )
}

export default EditLesson