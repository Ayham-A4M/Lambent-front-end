import { useParams, useLocation } from "react-router-dom"

import NewCourse from "../create-course/CreateCourse";
import { useState } from "react";
const EditCourseInformation = () => {
    // const [search, setSearch] = useSearchParams();
    const location = useLocation();
    const { courseId } = useParams();
    const [courseInformation, setCourseInformation] = useState(location.state);

    return (
        <div className="justify-items-stretch">
            <div>
                <NewCourse course={courseInformation} />
            </div>

        </div>
    )
}

export default EditCourseInformation