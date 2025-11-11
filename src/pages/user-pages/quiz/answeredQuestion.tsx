interface props {
  question: any;
  questionIndex: number;
  quizLength: number;
  answerIdx:number;
}
const AnsweredQuestion = ({questionIndex,quizLength,answerIdx,question}:props) => {
  return (
    <>
      <div className="space-y-2">
        <span className="font-bold mr-1">
          Question {questionIndex + 1}/{quizLength} :
        </span>
        {question?.question}
      </div>
      <span className="font-semibold">Answers :</span>
      <div className="space-y-6">
        {question?.options?.map((e: any, i: number) => (
          <div
            key={e?._id}
            className={`w-full duration-100 ${i===answerIdx?(e?.isCorrect?"border-green-500":"border-red-500"):`${e.isCorrect&&"border-green-500"}`}  border-[3px]  bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center gap-4 py-3 px-2`}
          >
            <div className="size-6 rounded-xl text-center bg-primary text-slate-200">{String.fromCharCode(65 + i)}</div>
            <span>{e?.option}</span>
          </div>
        ))}
        <div>
            <span className="font-bold animate-pulse duration-300">Explanation : </span>
            {question?.explanation}
        </div>
      </div>
    </>
  );
};

export default AnsweredQuestion;
