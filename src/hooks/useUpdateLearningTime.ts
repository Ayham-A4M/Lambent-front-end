import { useMutation } from "@tanstack/react-query"
import api from "@/utils/axiosInterceptor"
const useUpdateLearningTime = (endpoint:string) => {
  const updateLearningTimeMutation = useMutation({
        mutationFn: async (learningTime:number) => { return (await api.put(endpoint,{learningTime})).data },
        onError: (err) => { console.log(err) }
    })
    return {updateLearningTimeMutation}
}

export default useUpdateLearningTime