
import type { UpdateCourseType } from "../CreateCourse";
import api from "@/utils/axiosInterceptor"
const updateCourse = async (data: UpdateCourseType, updateId: string) => {
    const formData = new FormData();
    if (data.image) {
        formData.append("image", data?.image);
    }
    const courseObject = {
        name: data.name,
        description: data.description,
        isFree: data.isFree,
        type: data.type,
    }
    formData.append("courseInformation", JSON.stringify(courseObject));
    const response = await api.put(`/api/instructor/course/${updateId}`, formData);
    return response.data;
}

export default updateCourse