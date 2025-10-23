import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import useGET from "@/hooks/useGet";
import SpinnerPage from "@/components/spinner-page";
import LexicalEditor from "@/components/lexal-editor";
import { Button } from "@/components/ui/button";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
import LessonInformation from "@/components/shared/lesson-information";
import AddNewQuestion from "./add-new-question";
import { type questionType } from "./add-new-question";
import QuestionCard from "./question-card";
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
    const [newQuestions, setNewQuestions] = useState<questionType[] | null>(null);
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
                        <div className="flex justify-end">
                            <div className="flex justify-end items-center"  >
                                <Button variant={"outline"} className="cursor-pointer border-3 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-slate-100 ">
                                    <Link to={`/instructor/courses/${courseId}/lessons/${lessonId}/edit/quizzes`}>
                                        Management Realated Questions
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* <div className="w-full mt-10">
                            <h1 className="text-green-500 text-2xl font-bold ">Quizzes</h1>
                            <AddNewQuestion setNewQuestions={setNewQuestions} />
                        </div> */}



                        {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-3">
                            {
                                newQuestions?.map((e, i) => (
                                    <QuestionCard key={`question-${i}`} difficulty={e?.difficulty} explanation={e?.explanation} options={e?.options} question={e?.question} />
                                ))
                            }
                        </div>
                        {
                            (newQuestions && newQuestions?.length > 0) &&
                            <div className="flex justify-end items-center"  >
                                <Button variant={"outline"} className="cursor-pointer border-3 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-slate-100 ">Save New Questions</Button>
                            </div>
                        } */}

                    </div>
            }

        </>
    )
}

export default EditLesson