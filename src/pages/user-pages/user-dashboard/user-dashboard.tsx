import StatisticsCard from "@/components/statistics-card"
import { Card } from "@/components/ui/card";
import { FaFire, FaGraduationCap, FaBrain } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import CourseProgressCard from "./course-progress-card";
import { QuizzesChart } from "./quizzes-type-chart";
const UserDashboard = () => {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2">
                <StatisticsCard title="Learning Streak" value={150} icon={<FaFire className="text-orange-400 " />} />
                <StatisticsCard title="Courses Completed" value={10} icon={<FaGraduationCap className="text-zinc-500 dark:text-zinc-400" />} />
                <StatisticsCard title="Learning Time" value={"12 h"} icon={<PiClockFill className="text-blue-400" />} />
                <StatisticsCard title="Problems Solved" value={1205} icon={<FaBrain className="text-pink-300" />} />
            </div>
            <Card className="w-full  grid gird-cols-1 md:grid-cols-2">
                <div className="px-2">
                    <h1 className="text-2xl font-bold BitcountText">Learning Track</h1>
                    <CourseProgressCard title={"Algebra 3 (Advanced)"} value={20} courseType="math" />
                    <CourseProgressCard title={"How Elcetrecity work and why you should know it !!"} value={100} courseType="physics" />
                    <CourseProgressCard title={"Java Script 100 tips you should know"} value={50} courseType="programming" />
                    <CourseProgressCard title={"C++ Fundementals introduction"} value={66} courseType="programming" />
                </div>
                <div className="space-y-2">
                    <QuizzesChart />
                </div>




            </Card>



        </div>
    )
}

export default UserDashboard