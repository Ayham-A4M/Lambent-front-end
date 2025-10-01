import StatisticsCard from "@/components/statistics-card"
import { FaFire, FaGraduationCap, FaTrophy, FaBrain } from "react-icons/fa";

const UserDashboard = () => {
    return (
        <div className="">
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2">
                <StatisticsCard title="Learning Streak" value={150} icon={<FaFire className="text-orange-400 " />} />
                <StatisticsCard title="Courses Completed" value={10} icon={<FaGraduationCap className="text-zinc-500 dark:text-zinc-400" />} />
                <StatisticsCard title="Learning Time" value={"12 h"} icon={<FaTrophy className="text-blue-400" />} />
                <StatisticsCard title="Problems Solved" value={1205} icon={<FaBrain className="text-pink-300" />} />
            </div>
            <div>

            </div>



        </div>
    )
}

export default UserDashboard