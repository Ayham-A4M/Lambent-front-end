import { useMutation } from "@tanstack/react-query"
import createCourse from "./create-course"
import toast from "react-hot-toast"
import type { courseType } from "../CreateCourse"
const courseMutaion = (resetFields: () => void) => {
    const mutation = useMutation({
        mutationFn: async (data: courseType): Promise<any> => { return await createCourse(data) },
        onSuccess: (data) => {
            toast.success(data.msg || "course has been created successfully");
            resetFields();
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return mutation
}

export default courseMutaion