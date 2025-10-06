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
import mutationInstructor from "./handler/mutation-instructor";
import { Eye, EyeOff } from "lucide-react";
const instructorSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(30),
    userName: z.string().min(3, { message: 'user name must be at least 3' }).max(25, { message: 'maximum letters 25' }),
    age: z.number().min(25, { message: 'instructor age must be at least 25' }),
    gender: z.enum(["male", "female"]),
    country: z.string().min(5).max(50),
    image: z.file(),
    bio: z.string().max(1024),

})
export type instructorType = z.infer<typeof instructorSchema>;

const NewInstructor = () => {
    const form = useForm<instructorType>({
        resolver: zodResolver(instructorSchema),
        defaultValues: {
            age: 25,
            bio: "",
            country: "",
            gender: "male",
            userName: "",
            email: "",
        }
    });
    // const [image, setImage] = useState<File>();
    const imageRef = useRef<HTMLInputElement>(null)
    const [showPass, setShowPass] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const resetFields = () => {
        if (imageRef.current) {
            imageRef.current.value = "";
        }
        form.reset();
        setPreviewImage("");
    }
    const mutation = mutationInstructor(resetFields);


    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data: instructorType) => { mutation.mutate(data) })} className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="John44@gmail.com"   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className='relative w-full'>
                                        {
                                            form.getValues('password')?.length > 0 && (
                                                showPass ?
                                                    <Eye className='w-4 cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }} />
                                                    :
                                                    <EyeOff className='w-4 cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' role='button' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }} />
                                            )
                                        }

                                        <Input placeholder="••••••••••••" type={showPass ? 'text' : 'password'} {...field} />
                                    </div>
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
                                <FormLabel >Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="your age" type='number' className='rounded-[2px]' {...field} onChange={(e) => { form.setValue("age", parseInt(e.target.value)) }} />
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
                                <FormLabel >User Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe"   {...field} />
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
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="(eg). United Kingdom"  {...field} />
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
                                <span className="top-0">{form.getValues("bio").length}/ 1024</span>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Instructor Image</FormLabel>
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








                    <Button type="submit" disabled={mutation.isPending} className='cursor-pointer md:col-span-2 w-full rounded-none text-slate-200'>Submit</Button>
                    {/* <div className='text-center'>
                        or
                    </div>
                    <Button disabled={mutation.isPending} className='cursor-pointer w-full rounded-none bg-zinc-600 text-slate-200' onClick={(e) => { e.preventDefault(); setIsRegestring(true) }}>
                        dont have account
                    </Button> */}

                </form>
            </Form>
        </div >
    )
}

export default NewInstructor