import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineFileUpload } from "react-icons/md";
import { TbMathFunction } from "react-icons/tb";
import { GiAtomCore, GiChemicalDrop } from "react-icons/gi";
import { LuBrainCircuit } from "react-icons/lu";
import { IoLanguage } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import courseMutaion from "./handler/course-mutation";
import Spinner from "@/components/ui/spinner";
const baseCourseSchema = z.object({
    name: z.string().max(200),
    description: z.string().max(1024),
    type: z.enum(["Mathematics", "Logic", "Physics", "Chemistry", "Language", "Computer Science"]),
    isFree: z.boolean(),
});
export const createCourseSchema = baseCourseSchema.extend({
    image: z.instanceof(File, { message: "Image is required" }),
});
export const updateCourseSchema = baseCourseSchema.extend({
    image: z.instanceof(File).optional(),
});
export type CreateCourseType = z.infer<typeof createCourseSchema>;
export type UpdateCourseType = z.infer<typeof updateCourseSchema>;

const NewCourse = ({ course }: { course?: CreateCourseType & { _id: string } }) => {
    const form = useForm({
        resolver: zodResolver(course ? updateCourseSchema : createCourseSchema),
        defaultValues: {
            description: course?.description || "",
            isFree: course?.isFree || false,
            name: course?.name || "",
            type: course?.type || undefined,
        }
    });

    const imageRef = useRef<HTMLInputElement>(null)

    const [previewImage, setPreviewImage] = useState((course?.image) ? `http://localhost:8000${course.image}` : "");
    const resetFields = () => {
        if (imageRef.current) {
            imageRef.current.value = "";
        }
        form.reset();
        setPreviewImage("");
    }
    const mutation = courseMutaion(resetFields, course ? course._id : "");


    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data: CreateCourseType | UpdateCourseType) => { mutation.mutate(data) })} className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Course Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="(eg). Introduction to Calculus"   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Type</FormLabel>
                                <FormControl >
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="select course type" />
                                        </SelectTrigger>
                                        <SelectContent  >
                                            <SelectGroup >
                                                <SelectLabel>Course Types</SelectLabel>
                                                <SelectItem value="Mathematics" className="flex items-center gap4">Mathematics <TbMathFunction /></SelectItem>
                                                <SelectItem value="Logic" className="flex items-center gap4">Logic <LuBrainCircuit /></SelectItem>
                                                <SelectItem value="Physics" className="flex items-center gap4">Physics <GiAtomCore /></SelectItem>
                                                <SelectItem value="Chemistry" className="flex items-center gap4">Chemistry <GiChemicalDrop /></SelectItem>
                                                <SelectItem value="Language" className="flex items-center gap4">Language <IoLanguage /></SelectItem>
                                                <SelectItem value="Computer Science" className="flex items-center gap4">Computer Science  <FaCode /></SelectItem>
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
                        name="description"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2 relative">
                                <FormLabel >Bio (short sammury) about instructor</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="(eg.) Learn the fundamentals of calculus including limits, derivatives, and integrals"  {...field} />
                                </FormControl>
                                <span className="top-0">{form.getValues("description").length}/ 1024</span>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className='flex items-center gap-3 justify-start'>
                                <FormLabel>is course for free</FormLabel>
                                <FormControl>
                                    <Checkbox
                                        className='rounded-[2px] border-2'
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Course Image</FormLabel>
                                <FormControl>
                                    <div>

                                        <input id="inputFile" type="file" accept="image/*" ref={imageRef} className="hidden" onChange={(e) => {
                                            if (e.target.files && e.target.files?.length) {
                                                form.setValue("image", e.target.files[0]);
                                                const img = URL.createObjectURL(e.target.files[0]);
                                                setPreviewImage(img);
                                            }
                                        }} />
                                        {
                                            previewImage ?
                                                <div className="flex items-center gap-9">
                                                    <img src={previewImage} alt="instructor-image" className="size-28" />
                                                    <button type="button" className="text-slate-100 bg-red-500 px-3 py-1 rounded-[2px]"
                                                        onClick={(e) => {
                                                            e.preventDefault(); setPreviewImage("")
                                                            if (imageRef.current) {
                                                                imageRef.current.value = "";
                                                            }

                                                        }}
                                                    >Cancel
                                                    </button>

                                                </div>
                                                :
                                                <label htmlFor="inputFile" className="w-full text-primary cursor-pointer flex flex-col gap-2 items-center justify-center  py-12  border-2 border-ring">
                                                    <MdOutlineFileUpload className=" text-3xl" />
                                                    <span className="text-xl">upload image</span>
                                                </label>

                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={mutation.isPending} className='cursor-pointer md:col-span-2 w-full rounded-none text-slate-200'>
                        {
                            mutation.isPending ?
                                <Spinner talwindSize="size-6" />
                                :
                                course
                                    ?
                                    "Update Course"
                                    :
                                    "Create Course"
                        }
                    </Button>

                </form>
            </Form>
        </div >
    )
}

export default NewCourse