import StatisticsCard from "@/components/statistics-card"
import { FaStopwatch } from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { FaFire, FaGraduationCap, FaBrain } from "react-icons/fa";
import CourseProgressCard from "./course-progress-card";
import { LearningTimeChart } from "./learning-time-chart";
import useGET from "@/hooks/useGet";
const UserDashboard = () => {
    const {data,isLoading}=useGET(`/api/user/dashboard`,["dashboard"]);
    console.log(data);
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2">
                <StatisticsCard title="Learning Streak" value={150} icon={<FaFire className="text-orange-400 " />} />
                <StatisticsCard title="Courses Completed" value={10} icon={<FaGraduationCap className="text-zinc-500 dark:text-zinc-400" />} />
                <StatisticsCard title="Learning Time" value={"12 h"} icon={<FaStopwatch className="text-blue-400" />} />
                <StatisticsCard title="Problems Solved" value={1205} icon={<FaBrain className="text-pink-300" />} />
            </div>
            <Card className="w-full rounded-2xl px-3 grid max-[991px]:grid-cols-1 grid-cols-2">
                <div className="px-2">
                    <h1 className="text-2xl font-bold">Learning Track</h1>
                    <CourseProgressCard title={"Algebra 3 (Advanced)"} value={20} courseType="math" />
                    <CourseProgressCard title={"How Elcetrecity work and why you should know it !!"} value={100} courseType="physics" />
                    <CourseProgressCard title={"Java Script 100 tips you should know"} value={50} courseType="programming" />
                    <CourseProgressCard title={"C++ Fundementals introduction"} value={66} courseType="programming" />
                </div>
                <div className="space-y-2 w-full">
                    <h1 className="text-2xl font-bold px-2">Quizzes Track</h1>
                    <LearningTimeChart />
                </div>
            </Card>



        </div>
    )
}

export default UserDashboard