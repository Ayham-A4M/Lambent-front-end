import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator";
import { FaStar } from "react-icons/fa6";
import Spinner from "@/components/ui/spinner";
import useGetInstructors from "@/hooks/useGetInstructors"
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import DeleteDialog from "@/components/dialogs/delete-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/axiosInterceptor";
import toast from "react-hot-toast";
import EditInstructorDialog from "@/components/dialogs/edit-instructor-dialog";
const AllInstructors = () => {
    const { isLoading, data, page, setPage } = useGetInstructors();
    const [deleteInstructorId, setDeleteInstructorId] = useState<string>("");
    const [editInstructorId, setEditInstructorId] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => { return (await api.delete(`/api/admin/instructor/${deleteInstructorId}`))?.data },
        onSuccess: (data: any) => {
            setDeleteInstructorId("");
            toast.success(data.msg || "instructor has been deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['instructors'] })
        },
        onError: (err) => { console.log(err) }
    })

    const editMutation = useMutation({
        mutationFn: async (data: FormData) => { return (await api.put(`/api/admin/instructor/${editInstructorId}`, data))?.data },
        onSuccess: (data: any) => {
            setEditInstructorId("");
            toast.success(data.msg || "instructor has been edited successfully")
            queryClient.invalidateQueries({ queryKey: ['instructors'] })
        },
        onError: (err) => { console.log(err) }
    })

    return (
        <div>
            <Table >
                <TableCaption>list of instructors in the system</TableCaption>
                <TableHeader >
                    <TableRow className="border-t-[1px]">
                        <TableHead className="text-left">Image</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Country</TableHead>
                        <TableHead className="text-center">Total Courses</TableHead>

                        <TableHead className="text-center flex items-center justify-between ">
                            <Separator orientation="vertical" />
                            Action
                        </TableHead>

                    </TableRow>
                </TableHeader>
                {
                    isLoading ?
                        <TableBody>
                            <TableRow className="text-center">
                                <TableCell rowSpan={6} colSpan={6} className="text-center ">
                                    <div className="w-full flex justify-center">
                                        <Spinner talwindSize="size-8" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                        :
                        <TableBody>
                            {
                                data?.instructors?.map((e: any) => (
                                    <TableRow className="md:text-[.9rem] text-[.8rem]" key={e?._id}>
                                        <TableCell className="text-left  flex-1">
                                            <img src={`http://localhost:8000${e?.image}`} alt="instructor-image" className="size-10 rounded-full  " />
                                        </TableCell>
                                        <TableCell className="font-medium text-center">{e?.userName}</TableCell>
                                        <TableCell className="text-center h-[56px] gap-2 flex justify-center items-center">{e?.rating}<FaStar className="text-orange-400" /></TableCell>
                                        <TableCell className="text-center">{e?.email}</TableCell>
                                        <TableCell className="text-center">{e?.country}</TableCell>
                                        <TableCell className="text-center">{e?.numberOfCourses}</TableCell>
                                        <TableCell className="text-center flex items-center gap-2 justify-end">
                                            <Button variant="outline" size="icon" className="rounded-[6px] p-1 cursor-pointer size-8" type="button" onClick={() => { setDeleteInstructorId(e?._id) }}>
                                                <MdDelete className="text-red-500" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-[6px] cursor-pointer p-1 size-8" type="button" onClick={() => { setEditInstructorId(e?._id) }}>
                                                <FaUserEdit className="text-gray-500 dark:text-gray-400" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                }
            </Table >
            <DeleteDialog open={!!deleteInstructorId} disableButtons={mutation.isPending} onClose={() => { setDeleteInstructorId("") }} onSubmit={() => { mutation.mutate() }} />
            {
                editInstructorId &&
                <EditInstructorDialog id={editInstructorId} disableButtons={mutation.isPending} onClose={() => { setEditInstructorId("") }} onSubmit={(data:FormData) => { editMutation.mutate(data) }} />

            }
        </div >
    )
}

export default AllInstructors