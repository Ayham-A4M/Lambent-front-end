import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useGetInstructorForEdit from "@/hooks/useGetInstructorForEdit"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import Spinner from "../ui/spinner";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const editInstructorSchema = z.object({
    email: z.email(),
    userName: z.string().min(3, { message: 'user name must be at least 3' }).max(25, { message: 'maximum letters 25' }),
    age: z.number().min(25, { message: 'instructor age must be at least 25' }),
    gender: z.enum(["male", "female"]),
    country: z.string().min(5).max(50),
    image: z.file().optional(),
    bio: z.string().max(1024),
})
export type editInstructorType = z.infer<typeof editInstructorSchema>;
const EditInstructorDialog = ({ id, disableButtons, onClose, onSubmit }: { id: string, disableButtons: boolean, onClose: () => void, onSubmit: (data: any) => void }) => {
    const { isLoading, data } = useGetInstructorForEdit(id);

    const form = useForm<editInstructorType>({
        resolver: zodResolver(editInstructorSchema),
        defaultValues: {
            email: data?.instructor?.email || "",
            bio: data?.instructor?.bio || "",
            age: data?.instructor?.age || 25,
            gender: data?.instructor?.gender || "male",
            country: data?.instructor?.country || "",
            userName: data?.instructor?.userName || "",
        }
    })
    const [previewImage, setPreviewImage] = useState<string>("");
    const imageRef = useRef<HTMLInputElement>(null);
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files?.length) { return; }
        const image = e?.target?.files[0];
        const urlImage = URL.createObjectURL(image);
        setPreviewImage(urlImage);
        form.setValue("image", e.target.files[0]);

    }
    const handleSubmit = (data: editInstructorType) => {
        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        const instructorObject = {
            age: data.age,
            bio: data.bio,
            country: data.country,
            email: data.email,
            userName: data.userName,
            gender: data.gender,
        }
        formData.append("instructor", JSON.stringify(instructorObject));
        onSubmit(formData);
    }


    return (
        <Dialog open={!!id} onOpenChange={() => { onClose() }}  >
            <DialogContent className="max-h-[550px] overflow-auto" onOpenAutoFocus={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Edit Record</DialogTitle>
                </DialogHeader>

                <DialogDescription>

                    {
                        isLoading ?
                            <div className="w-full py-10 flex items-center flex-col gap-2 justify-center">
                                <Spinner />
                                <span>loading pleas wait</span>
                            </div>
                            :
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit((data: editInstructorType) => { handleSubmit(data) })} className="space-y-5 text-popover-foreground" >
                                    <div className="flex items-end gap-3">
                                        <img src={previewImage || `http://localhost:8000${data?.instructor.image}`} alt="instructor-image" className="rounded-full size-18" />
                                        {
                                            previewImage ?
                                                <Button variant="outline" type="button" size="icon" className=" size-8 text-red-400 cursor-pointer rounded-xl"
                                                    onClick={() => {
                                                        setPreviewImage("");
                                                        if (imageRef.current) {
                                                            imageRef.current.value = ""
                                                        }
                                                        form.resetField("image");
                                                    }}
                                                >
                                                    <IoClose />
                                                </Button>
                                                :
                                                <label htmlFor="fiel-input" className="rounded-xl p-2 cursor-pointer  border-[1px]" >
                                                    <MdEdit />
                                                </label>
                                        }
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={() => (
                                                <FormItem className="md:col-span-2">
                                                    <FormControl>
                                                        <div>
                                                            <input type="file" id="fiel-input" accept="image/*" ref={imageRef} className="hidden" onChange={handleChangeImage} />

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John44@gmail.com"   {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="userName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John123"   {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="your age" type='number' className='rounded-[2px]' {...field} onChange={(e) => { form.setValue("age", parseInt(e.target.value)) }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="(eg.) United Kingdom"   {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl >
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent  >
                                                            <SelectGroup >
                                                                <SelectLabel>Gender</SelectLabel>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2 relative">
                                                <FormLabel >Bio (short sammury) about instructor</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="John Doe"  {...field} />
                                                </FormControl>
                                                {/* <span className="top-0">{form.getValues("bio").length}/ 1024</span> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button disabled={disableButtons} type="button" variant="outline" className="cursor-pointer" onClick={() => { onClose }}>Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={disableButtons || isLoading} className="bg-zinc-700 text-slate-200 cursor-pointer">
                                            {
                                                disableButtons ?
                                                    <Spinner talwindSize="size-6" />
                                                    :
                                                    "Edit"
                                            }
                                        </Button>
                                    </DialogFooter>
                                </form>

                            </Form>
                    }




                </DialogDescription>




            </DialogContent>


        </Dialog >
    )
}

export default EditInstructorDialog