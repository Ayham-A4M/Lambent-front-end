import { useState } from "react"
import AddNewQuestion from "../edit-lessson/add-new-question"
import { type questionType } from "../edit-lessson/add-new-question"
import QuestionCard from "../edit-lessson/question-card"
import { Button } from "@/components/ui/button"
import { FaQuestion } from "react-icons/fa"
import { Separator } from "@/components/ui/separator"
import usePUT from "@/hooks/usePUT"
import { useParams } from "react-router-dom"
const QuizzesManagement = () => {
  const [newQuestions, setNewQuestions] = useState<questionType[] | null>(null);
  // const {courseId,lessonId}=useParams()
  // const {mutation}=usePUT(`/api/instructor/`)
  return (

    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-primary text-2xl font-extrabold ">
        <h1> Management Questions </h1>
        <FaQuestion />
      </div>

      <AddNewQuestion setNewQuestions={setNewQuestions} />
      <Separator />
      {
        (newQuestions && newQuestions?.length > 0) &&
        <div className="flex justify-end items-center"  >
          <Button variant={"outline"}
            className="cursor-pointer border-3 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-slate-100"
            onClick={()=>{console.log("all : ",newQuestions)}}
          >
            Save New Questions
          </Button>
        </div>
      }
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3 ">
        {
          newQuestions?.map((e, i) => (
            <QuestionCard key={`question-${i}`} difficulty={e?.difficulty} explanation={e?.explanation} options={e?.options} question={e?.question} />
          ))
        }
      </div>

    </div>


  )
}

export default QuizzesManagement