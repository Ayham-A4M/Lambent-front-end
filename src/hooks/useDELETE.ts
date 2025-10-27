import api from "@/utils/axiosInterceptor"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useDELETE = (endpoint: string, onSuccess?: () => void) => {
    const mutation = useMutation({
        mutationFn: async () => { return (await api.delete(endpoint)).data },
        onSuccess: (data) => {
            toast.success(data?.msg);
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (err) => { console.log(err) }
    })
    return { mutation }
}
export default useDELETE