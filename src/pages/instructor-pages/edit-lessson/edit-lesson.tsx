import useGET from "@/hooks/useGet";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import LexicalEditor from "@/components/lexal-editor";
const EditLesson = () => {
    // const { lessonId, courseId } = useParams();
    const location = useLocation()
    const { lessonNumber, name, description } = location.state;
    // const { data, isLoading } = useGET(`/api/instructor/course/${courseId}/lesson/${lessonId}`, ["pages"]);
    const [text, setText] = useState<string>("");

    return (
        <div>
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-xl text-primary">
                    <h1>{name}</h1>
                    <span>#{lessonNumber}</span>
                </div>
                <p className="text-sm">{description}</p>
                  <LexicalEditor onChange={setText} />
                <span>{text}</span>
            </div>
        </div>
    )
}

export default EditLesson