
import { Link, useLocation } from "react-router-dom";
import { LiaAtomSolid } from "react-icons/lia";
import { PiFlaskFill } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { IoLanguageSharp } from "react-icons/io5";
import { TbMathFunction } from "react-icons/tb";
["Mathematics", "Logic", "Physics", "Chemistry", "Language", "Computer Science"]
const LessonCard = ({ lesson, role }: { lesson: any, role: string }) => {
    const location = useLocation()
    const { courseType } = location.state;
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
            <Link className="pointer-events-none" to={`${role == "instructor" ? "/instructor" : ""}/courses/${lesson?.courseId}/lessons/${lesson?._id}/${role == "instructor" ? "edit" : "view"}`} state={{ lesson: lesson }}>
                <div className="w-32 h-40 bg-gray-200 dark:bg-zinc-300 rounded-r-xl  py-1 border-l-[10px] text-primary  border-primary flex flex-col items-center justify-evenly">
                    {getTypeIcon()}
                    <span className="text-[.9rem] text-center px-[1px]">{courseType}</span>
                    <span className="font-[cursive] text-[1.1rem]">{lesson?.lessonNumber}</span>
                </div>
            </Link>
        </>
    );
};

export default LessonCard;
