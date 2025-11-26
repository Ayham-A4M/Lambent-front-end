import StatisticsCard from "@/components/statistics-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GiStopwatch } from "react-icons/gi";
import { FaFire, FaGraduationCap, FaBrain } from "react-icons/fa";
import CourseProgressCard from "./course-progress-card";
import { LearningTimeChart } from "./learning-time-chart";
import useGET from "@/hooks/useGet";
import SpinnerPage from "@/components/spinner-page";
const UserDashboard = () => {
  const getChartData = (chartData: null | { dayIdx: number; learningTime: number; _id: string }[]) => {
    const defaultChartData = [
      { day: "Monday", learningTime: 0 },
      { day: "Tuesday", learningTime: 0 },
      { day: "Wednesday", learningTime: 0 },
      { day: "Thursday", learningTime: 0 },
      { day: "Friday", learningTime: 0 },
      { day: "Saturday", learningTime: 0 },
      { day: "Sunday", learningTime: 0 },
    ];
    if (!chartData) {
      return defaultChartData;
    }
    chartData?.map((e) => {
      if (e?.dayIdx === 0 && e?.learningTime) {
        defaultChartData[6].learningTime = e?.learningTime;
      } else {
        if (defaultChartData[e?.dayIdx - 1]) defaultChartData[e?.dayIdx - 1].learningTime = e?.learningTime;
      }
    });
    return defaultChartData;
  };
  const { data, isLoading } = useGET(`/api/user/dashboard`, ["dashboard"]);
  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2">
            <StatisticsCard title="Learning Streak" value={data?.streak} icon={<FaFire className="text-orange-400 " />} />
            <StatisticsCard title="Courses Completed" value={data?.completedCourses} icon={<FaGraduationCap className="text-zinc-500 dark:text-zinc-400" />} />
            <StatisticsCard title="Learning Time" value={`${Math.ceil(data?.spendTimeLearning?.today)} m`} icon={<GiStopwatch className="text-blue-400" />} />
            <StatisticsCard
              title="Questions"
              value={``}
              icon={<FaBrain className="text-pink-300" />}
              children={
                <div className="flex items-center flex-wrap gap-y-2 justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[.8rem]">solved</span>
                    <span className="size-3 rounded-full bg-green-400"></span>
                    <span>{data?.quizAnalyze?.correct || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[.8rem]">wrong</span>
                    <span className="size-3 rounded-full bg-red-400"></span>
                    <span>{data?.quizAnalyze?.incorrect || 0}</span>
                  </div>
                </div>
              }
            />
          </div>
          <Card className="w-full rounded-2xl ">
            <CardHeader className="px-3">
              <h1 className="text-2xl font-bold">Learning Track</h1>
            </CardHeader>
            <CardContent className="px-3 gap-6 grid max-[991px]:grid-cols-1 grid-cols-2">
              <div className="px-2">
                {data?.coursesProgress?.map((e: any) => (
                  <CourseProgressCard courseId={e?.courseId} key={e?._id} title={e?.courseName} value={e?.progressPercentage} courseType={e?.courseType} />
                ))}
              </div>
              <LearningTimeChart chartData={getChartData(data?.spendTimeLearning?.weekChart || null)} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
