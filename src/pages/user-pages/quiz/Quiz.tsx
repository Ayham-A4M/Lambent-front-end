import { Button } from "@/components/ui/button";
import useGET from "@/hooks/useGet";
import QuizHeader from "./quiz-header";
import Question from "./question";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerPage from "@/components/spinner-page";
import AnsweredQuestion from "./answeredQuestion";
import Answers from "./answers";
import usePOST from "@/hooks/usePOST";
import CompletedQuizDialog from "@/components/dialogs/completed-quiz";
import useCalculateLearningTime from "@/hooks/useCalculateLearningTime";
import useNavigationReporter from "@/hooks/useNavigationReporter";
const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const [answers, setAnswers] = useState<any[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answerId, setAnswerId] = useState<string | null>(null);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [showCompleteQuizPopup, setShowCompleteQuizPopup] = useState<boolean>(false);
  const { data, isLoading } = useGET(`/api/user/courses/${courseId}/lessons/${lessonId}/quiz`, ["quiz"]);
  const handleConfirmAnswer = () => {
    if (answerIdx == null) {
      return;
    }
    const newAnswer = { answerId, isCorrect: data?.quiz?.questions[currentQuestionIdx].options[answerIdx].isCorrect, answerIdx, questionId: data?.quiz?.questions[currentQuestionIdx]._id };
    setAnswers((prev) => (prev.length > 0 ? [...prev, newAnswer] : [newAnswer]));
    if (currentQuestionIdx + 1 < data?.quiz?.questions.length) {
      setCurrentQuestionIdx((prev: number) => prev + 1);
    } else if (currentQuestionIdx + 1 === data?.quiz?.questions?.length) {
      setShowCompleteQuizPopup(true);
      mutation.mutate();
    }

    setAnswerId(null);
    setAnswerIdx(null);
  };
  const { mutation } = usePOST(`/api/user/courses/${courseId}/lessons/${lessonId}/quiz/${data?.quiz?._id}/completed`, { answers });
  const {startingLearningTime,unFocusTime}=useCalculateLearningTime();
  useNavigationReporter(startingLearningTime.current,unFocusTime.current);
  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <div className="w-full flex max-[1100px]:flex-wrap gap-20">
          <div className="w-full space-y-6">
            <QuizHeader percentage={parseFloat((((data?.hasCompletedQuiz?data?.hasCompletedQuiz?.answers?.length:answers.length) / data?.quiz?.questions?.length) * 100).toFixed(1))} />
            {data?.hasCompletedQuiz?.answers[currentQuestionIdx] ? (

              <AnsweredQuestion question={data?.quiz?.questions[currentQuestionIdx]} answerIdx={data?.hasCompletedQuiz?.answers[currentQuestionIdx]?.answerIdx} questionIndex={currentQuestionIdx} quizLength={data?.quiz?.questions?.length} />
            ) : answers[currentQuestionIdx] ? (
              <AnsweredQuestion question={data?.quiz?.questions[currentQuestionIdx]} answerIdx={answers[currentQuestionIdx].answerIdx} questionIndex={currentQuestionIdx} quizLength={data?.quiz?.questions?.length} />
            ) : (
              <Question question={data?.quiz?.questions[currentQuestionIdx]} questionIndex={currentQuestionIdx} quizLength={data?.quiz?.questions?.length} answerId={answerId} setAnswerId={setAnswerId} setAnswerIdx={setAnswerIdx} />
            )}

            <div className="w-full flex justify-end items-center gap-2">
              <Button
                disabled={currentQuestionIdx <= 0}
                className="rounded-xl cursor-pointer border-3 border-primary  text-primary font-bold"
                variant="outline"
                onClick={() => {
                  setCurrentQuestionIdx((prev) => prev - 1);
                }}
              >
                Previous
              </Button>
              {answers[currentQuestionIdx] || data?.hasCompletedQuiz?.answers[currentQuestionIdx] ? (
                <Button
                  disabled={currentQuestionIdx + 1 >= data?.quiz?.questions?.length}
                  className="bg-primary rounded-xl text-slate-200 cursor-pointer font-bold"
                  onClick={() => {
                    setCurrentQuestionIdx((prev) => prev + 1);
                  }}
                >
                  Next
                </Button>
              ) : (
                !data?.hasCompletedQuiz && (
                  <Button
                    disabled={currentQuestionIdx >= data?.quiz?.questions?.length || answerIdx == null}
                    className="bg-primary rounded-xl text-slate-200 cursor-pointer font-bold"
                    onClick={() => {
                      handleConfirmAnswer();
                    }}
                  >
                    Submit
                  </Button>
                )
              )}
            </div>
          </div>
          <Answers answers={data?.hasCompletedQuiz?.answers || answers} quizLength={data?.quiz?.questions.length} />
        </div>
      )}
      <CompletedQuizDialog
        open={showCompleteQuizPopup}
        onClose={() => {
          setShowCompleteQuizPopup(false);
        }}
      />
    </>
  );
};

export default Quiz;
