import React from "react";
const Answers = ({ answers, quizLength }: { answers: any[]; quizLength: number }) => {
  const trueAnswersNumber:number|null=answers.length>0?(answers?.filter((e:any)=>(e?.isCorrect)).length):null
  return (
    <div className="space-y-6 w-[22%] max-[1100px]:w-full flex flex-col items-center max-[1100px]:items-start">
      <div className="flex flex-col w-full  max-w-[250px] gap-1 items-center justify-center px-2.5 py-4 bg-slate-200 dark:bg-slate-700 rounded-xl">
        <h1 className="font-bold text-2xl">
          {
            trueAnswersNumber?
            (trueAnswersNumber/answers.length)*100
            :
            0
          }
          %
        </h1>
        <span className="text-[.8rem] text-gray-500 dark:text-gray-300 text-center">you get {trueAnswersNumber||0} answers correct from {answers.length} answers</span>
      </div>
      <div className="w-full  space-y-2 ">
        {Array.from(Array(quizLength).keys()).map((_, i: number) => (
          <div key={`answers-${i}`} className="flex items-center  gap-2 w-full  rounded-xl px-3 py-2 bg-slate-200 dark:bg-slate-700">
            {answers[i] ? <div className={`size-5 rounded-full ${answers[i]?.isCorrect ? "bg-green-500" : "bg-red-500"}`}></div> : <div className={`size-5 rounded-full bg-slate-50`}></div>}
            <span>Question {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Answers);
