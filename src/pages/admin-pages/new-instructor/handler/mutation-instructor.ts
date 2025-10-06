import { useMutation } from "@tanstack/react-query"
import createInstructor from "./create-instructor"
import toast from "react-hot-toast"
import type { instructorType } from "../new-instructor"
const mutationInstructor = (resetFields:()=>void) => {
    const mutation = useMutation({
        mutationFn: async (data: instructorType): Promise<any> => { return await createInstructor(data) },
        onSuccess: (data) => {
            toast.success(data.msg || "instructor has been saved successfully");
            resetFields();

        },
        onError: (err) => {
            console.log(err)
        }
    })
    return mutation
}

export default mutationInstructor