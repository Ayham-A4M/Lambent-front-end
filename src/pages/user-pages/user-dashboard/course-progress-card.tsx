
type props = {
    title: string,
    value: number,
    courseType: string
}
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiMath } from "react-icons/bi";
import { TbTargetArrow } from "react-icons/tb";
import { GrTest } from "react-icons/gr";
import { LuBrainCircuit } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import type { ReactNode } from "react";
const CourseProgressCard = ({ title, value, courseType }: props) => {
    const getProgressColor = (): string => {
        if (value <= 20) { return "bg-blue-400" }
        else if (value > 20 && value <= 50) { return "bg-violet-400" }
        else if (value > 50 && value <= 89) { return "bg-yellow-400" }
        else {
            return "bg-green-400"
        }

    }

    const getCourseTypeIcon = (): ReactNode => {
        switch (courseType) {
            case "physics":
                return <GrTest className="text-violet-500" />
            case "math":
                return <BiMath className="text-green-400" />
            case "logic":
                return <LuBrainCircuit className="text-pink-300" />
            case "programming":
                return <FaCode className="text-blue-400" />
            default:

                break;
        }
    }

    return (
        <div className="w-full  py-3  flex flex-col gap-1.5 border-b-2">
            <div className="flex items-center justify-between">
                <span className="text-[.9rem] font-light">{title}</span>
                <div className="flex items-center gap-2 text-[.7rem]">
                    {courseType}
                    {getCourseTypeIcon()}
                </div>
            </div>
            <div className="w-full h-2 rounded-xl bg-slate-200 dark:bg-slate-600 border-r-[1px]">
                <div className={`h-full rounded-xl ${getProgressColor()}`} style={{ width: `${value}%` }}>
                </div>
            </div>
            <div className="flex items-center gap-2 text-[.9rem]">
                <span>{value}%</span>
                {
                    value === 100 ?
                        <BsFillPatchCheckFill className="text-green-400" />
                        :

                        <TbTargetArrow className="text-red-400" />
                }
            </div>
        </div>
    )
}

export default CourseProgressCard