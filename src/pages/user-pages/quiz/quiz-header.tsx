import { CheckCircle2Icon } from "lucide-react";
const QuizHeader = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full space-y-3">
      <h1 className="text-2xl font-bold">Lesson Quiz</h1>
      <div className="flex items-center gap-2">
        <div className="w-full rounded-xl h-2 bg-slate-200 dark:bg-slate-300">
          <div className="rounded-xl h-full duration-300  bg-primary" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="flex item-center gap-2">{percentage}%<CheckCircle2Icon className="text-[.8rem]"/></span>
      </div>
    </div>
  );
};

export default QuizHeader;
