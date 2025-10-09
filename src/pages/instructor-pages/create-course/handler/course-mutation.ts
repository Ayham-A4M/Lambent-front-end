import { useMutation } from "@tanstack/react-query"
import createCourse from "./create-course"
import toast from "react-hot-toast"
import updateCourse from "./update-course"
import type { CreateCourseType, UpdateCourseType } from "../CreateCourse"
import { useNavigate } from "react-router-dom"
const courseMutaion = (resetFields: () => void, updateId: string) => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: async (data: CreateCourseType | UpdateCourseType): Promise<any> => {
            if (!!!updateId) {
                return await createCourse(data as CreateCourseType)
            } else {
                return await updateCourse(data, updateId);
            }
        },
        onSuccess: (data) => {
            toast.success(data.msg);
            if (!!updateId) {
                navigate("/instructor/courses", { replace: true })
            } else {
                resetFields();
            }
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return mutation
}

export default courseMutaion