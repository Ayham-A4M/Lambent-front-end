import type { questionType } from "@/pages/instructor-pages/edit-lessson/add-new-question"
import api from "@/utils/axiosInterceptor"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useUpdateQuestion = (endpoint: string) => {
    const updateQuestionMutation = useMutation({
        mutationFn: async (data: questionType) => {

            return (await (api.put(endpoint, data))).data
        },
        onSuccess: (data) => {
            toast.success(data?.msg);
        },
        onError: (err) => {
            console.log(err);
        }
    })
    return { updateQuestionMutation }
}
export default useUpdateQuestion