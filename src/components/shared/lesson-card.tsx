import { Link, useLocation } from "react-router-dom";
import { LiaAtomSolid } from "react-icons/lia";
import { PiFlaskFill } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { IoLanguageSharp } from "react-icons/io5";
import { TbMathFunction } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
["Mathematics", "Logic", "Physics", "Chemistry", "Language", "Computer Science"]
const LessonCard = ({ lesson, role, isCompleted, isBookMark }: { lesson: any, role: string, isCompleted?: boolean, isBookMark?: boolean }) => {
    const location = useLocation()
    const { courseType } = location.state;
    const hasAccess: boolean = location?.state?.hasAccess || false
    const getTypeIcon = () => {
        switch (courseType) {
            case "Mathematics":
                return <TbMathFunction className="size-6" />
            case "Logic":
                return <LuBrainCircuit className="size-6" />
            case "Physics":
                return <LiaAtomSolid className="size-6" />
            case "Chemistry":
                return <PiFlaskFill className="size-6" />
            case "Language":
                return <IoLanguageSharp className="size-6" />
            case "Computer Science":
                return <FaCode className="size-6" />
            default:
                break;
        }
    }
    return (
        <>
            <Link className={`${(role === "instructor" || hasAccess) ? "" : "pointer-events-none"}`} to={`${role == "instructor" ? "/instructor" : ""}/courses/${lesson?.courseId}/lessons/${lesson?._id}/${role == "instructor" ? "edit" : "view"}`} state={{ lesson: lesson }}>
                <div className={`w-32 h-40 bg-gray-200 dark:bg-zinc-300  relative rounded-r-xl  py-1 border-l-[10px] text-primary border-primary  flex flex-col items-center justify-evenly`}>
                    {
                        isCompleted &&
                        <FaCircleCheck className="absolute size-5 bottom-1 right-1 text-green-500" />
                    }
                    {
                        isBookMark &&
                        <>
                            <div className="absolute top-0 rounded-t-[1px] right-3 w-3 h-[40px] bg-red-400"></div>
                            <div className="absolute border-[6px]  top-[29px] border-transparent border-b-gray-200 dark:border-b-zinc-300 right-3"></div>
                        </>
                    }
                    {getTypeIcon()}
                    <span className="text-[.9rem] text-center px-[1px]">{courseType}</span>
                    <span className="font-[cursive] text-[1.1rem]">{lesson?.lessonNumber}</span>
                </div>
            </Link>
        </>
    );
};

export default LessonCard;
