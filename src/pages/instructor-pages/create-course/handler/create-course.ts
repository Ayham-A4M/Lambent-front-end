
import type { CreateCourseType } from "../CreateCourse";
import api from "@/utils/axiosInterceptor"
const createCourse = async (data: CreateCourseType) => {
    const formData = new FormData();
    formData.append("image", data?.image);
    const courseObject = {
        name: data.name,
        description: data.description,
        isFree: data.isFree,
        type: data.type,
    }
    formData.append("courseInformation", JSON.stringify(courseObject));
    const response = await api.post('/api/instructor/course', formData);
    return response.data;
}

export default createCourse
