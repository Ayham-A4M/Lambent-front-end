import { useState } from "react"
import AddNewQuestion from "../edit-lessson/add-new-question"
import { type questionType } from "../edit-lessson/add-new-question"
import QuestionCard from "../edit-lessson/question-card"
import { Button } from "@/components/ui/button"
import { FaQuestion } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import usePUT from "@/hooks/usePUT"
import { useParams } from "react-router-dom"
import Spinner from "@/components/ui/spinner"
import useGET from "@/hooks/useGet"
import useUpdateQuestion from "@/hooks/useEditQuestion"
import DeleteDialog from "@/components/dialogs/delete-dialog"
import useDELETE from "@/hooks/useDELETE"
const QuizzesManagement = () => {
  const [newQuestions, setNewQuestions] = useState<questionType[] | null>(null);
  const { courseId, lessonId } = useParams();
  const { data, isLoading } = useGET(`/api/instructor/courses/${courseId}/lessons/${lessonId}/quiz`, ["questions"]);
  const { mutation } = usePUT(`/api/instructor/courses/${courseId}/lessons/${lessonId}/quiz`, { newQuestions }, ["questions"]);
  const [editQuestion, setEditQuestion] = useState<questionType | null>(null)
  const { updateQuestionMutation } = useUpdateQuestion(`/api/instructor/courses/${courseId}/lessons/${lessonId}/quiz/${editQuestion?._id}`);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string>("");
  const deleteMutation = useDELETE(`/api/instructor/courses/${courseId}/lessons/${lessonId}/quiz/${deleteQuestionId}`, () => { data.quiz = data?.quiz?.questions?.filter((e: questionType) => (e._id !== deleteQuestionId)); setDeleteQuestionId("") })
  return (

    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-primary text-2xl font-extrabold ">
        <h1> Management Questions </h1>
        <FaQuestion />
      </div>
      {
        editQuestion &&
        <div className="flex justify-end items-center mb-1.5">
          <Button variant="outline" className="cursor-pointer border-3 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-slate-100"
            onClick={() => setEditQuestion(null)}
          >
            Discard Edit
          </Button>
        </div>
      }
      <AddNewQuestion setEditQuestion={setEditQuestion} updateQuestionMutation={updateQuestionMutation} setNewQuestions={setNewQuestions} editQuestion={editQuestion} />
      <Separator />
      {
        (newQuestions && newQuestions?.length > 0) &&
        <div className="flex justify-end items-center"  >
          <Button disabled={mutation.isPending} variant={"outline"}
            className="cursor-pointer border-3 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-slate-100"
            onClick={() => { mutation.mutate() }}
          >
            {
              mutation.isPending ?
                <>
                  <Spinner talwindSize="size-4" />
                  saving
                </>
                :
                "Save New Questions"

            }
          </Button>
        </div>
      }
      {
        isLoading ?
          <div className="flex items-center flex-col gap-3 justify-center py-3 w-full">
            <Spinner talwindSize="size-8" />
            loading questions ...
          </div>
          :
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
            {
              data?.quiz?.questions?.map((e: questionType) => (
                <QuestionCard setDeleteQuestionId={setDeleteQuestionId} _id={e?._id} setEditQuestion={setEditQuestion} key={e?._id} difficulty={e?.difficulty} explanation={e?.explanation} options={e?.options} question={e?.question} />

              ))
            }
            {
              newQuestions?.map((e, i) => (
                <QuestionCard setDeleteQuestionId={setDeleteQuestionId} setEditQuestion={setEditQuestion} key={`question-${i}`} difficulty={e?.difficulty} explanation={e?.explanation} options={e?.options} question={e?.question} />
              ))
            }
          </div>

      }

      <DeleteDialog
        open={!!deleteQuestionId}
        onClose={() => { setDeleteQuestionId("") }}
        disableButtons={deleteMutation.mutation.isPending}
        onSubmit={() => { deleteMutation.mutation.mutate() }}
      />
    </div>


  )
}

export default QuizzesManagement