import type { instructorType } from "../new-instructor"
import api from "@/utils/axiosInterceptor"
const createInstructor = async (data: instructorType) => {
    const formData = new FormData();
    formData.append("image", data?.image);
    const instructorObject = {
        age: data.age,
        bio: data.bio,
        country: data.country,
        email: data.email,
        password: data.password,
        userName: data.userName,
        gender: data.gender,
    }
    formData.append("instructor", JSON.stringify(instructorObject));
    const response = await api.post('/api/admin/instructor', formData);
    return response.data;
}

export default createInstructor