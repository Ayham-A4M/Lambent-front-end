import React from "react";
interface props {
  question: any;
  questionIndex: number;
  quizLength: number;
  answerId: string | null;
  setAnswerId: React.Dispatch<React.SetStateAction<string | null>>;
  setAnswerIdx: React.Dispatch<React.SetStateAction<number | null>>;
}
const Question = ({ question, questionIndex, quizLength, setAnswerId, answerId, setAnswerIdx }: props) => {
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
          <button
            key={e?._id}
            className={`w-full duration-100 ${question?.options[i]?._id == answerId ? "border-primary" : ""} border-[3px] cursor-pointer  bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center gap-4 py-3 px-2`}
            onClick={() => {
              setAnswerId(question?.options[i]?._id);
              setAnswerIdx(i);
            }}
          >
            <div className="size-6 rounded-xl text-center bg-primary text-slate-200">{String.fromCharCode(65 + i)}</div>
            <span>{e?.option}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
