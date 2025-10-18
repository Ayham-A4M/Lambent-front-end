
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";


const LessonCard = ({ lesson, role }: { lesson: any, role: string }) => {
    return (
        <>
            {
                role === "instructor"
                    ?
                    <Link to={`/instructor/courses/${lesson?.courseId}/lessons/${lesson?._id}/edit`} state={{ lesson: lesson }}>
                        <div className="text-center text-primary  hover:text-popover-foreground duration-100 cursor-pointer transition-colors w-fit">
                            <FaFileAlt className="size-16" />
                            <span>#{lesson?.lessonNumber}</span>
                        </div>
                    </Link>

                    :
                    <Link to={`/course/${lesson?.courseId}/lesson/${lesson?._id}/view`}>
                        <div className="text-center text-primary  hover:text-popover-foreground duration-100 cursor-pointer transition-colors w-fit">
                            <FaFileAlt className="size-16" />
                            <span>#{lesson?.lessonNumber}</span>
                        </div>
                    </Link>

            }

        </>
    );
};

export default LessonCard;
