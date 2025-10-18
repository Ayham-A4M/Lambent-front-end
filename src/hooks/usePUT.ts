import api from "@/utils/axiosInterceptor"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const usePUT = (endpoint: string, data: object, keys?: string[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => { return (await api.put(endpoint, data)).data },
        onSuccess: (data) => {
            toast.success(data?.msg);
            if (keys && keys.length > 0)
                queryClient.invalidateQueries({ queryKey: keys });
        },
        onError: (err) => { console.log(err) }
    })
    return { mutation }
}
export default usePUT