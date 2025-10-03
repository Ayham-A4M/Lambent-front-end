import api from "@/utils/axiosInterceptor"
import type { signupSchema } from "../signup"
const signupRequest = async (data: Omit<signupSchema, 'confirmPassword'>) => {
    const response = await api.post("/api/auth/sign-up", {
        userName:data.userName,
        age:data.age,
        password:data.password,
        gender:data.gender,
        email:data.email,
    });
    return response.data;
}

export default signupRequest