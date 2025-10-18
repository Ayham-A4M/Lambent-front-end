import api from "@/utils/axiosInterceptor"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const usePOST = (endpoint: string, data: object) => {
    const mutation = useMutation({
        mutationFn: async () => { return (await api.post(endpoint, data)).data },
        onSuccess: (data) => { toast.success(data?.msg) },
        onError: (err) => { console.log(err) }
    })
    return { mutation }
}
export default usePOST