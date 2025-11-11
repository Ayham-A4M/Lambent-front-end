const QuizHeader = ({percentage}:{percentage:number}) => {
  return (
    <div className="w-full space-y-3">
      <h1 className="text-3xl font-bold">Lesson Quiz</h1>
      <div className="flex items-center gap-2">
        <div className="w-full rounded-xl h-2 bg-slate-200 dark:bg-slate-300">
          <div className="rounded-xl h-full duration-300  bg-primary" style={{width:`${percentage}%`}}></div>
        </div>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default QuizHeader;
