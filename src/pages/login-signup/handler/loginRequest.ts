import api from "@/utils/axiosInterceptor"
import type { loginType } from "../login"
const loginRequest = async (data: loginType) => {
    const response = await api.post('/api/auth/login', data);
    return response.data
}

export default loginRequest