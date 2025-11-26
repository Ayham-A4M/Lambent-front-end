import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import ProgressSignup from './progress-signup';

import { useMutation } from '@tanstack/react-query';
import signupRequest from './handler/signupRequest';
import { toast } from "react-hot-toast"
const signupSchema = z.object({
    userName: z.string().min(3, { message: 'user name must be at least 3' }).max(25, { message: 'maximum letters 25' }),
    email: z.email(),
    age: z.number().min(18),
    gender: z.enum(["male", "female"]),
    password: z.string().min(8, { message: 'passowrd minimum length is 8' }).max(30, 'password maximum length is 30'),
    confirmPassword: z.string(),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

const steps = [
    {
        stepNo: 1,
        requireFileds: ['userName', 'email']
    }, {
        stepNo: 2,
        requireFileds: ['age', 'gender']
    }, {
        stepNo: 3,
        requireFileds: ['password', 'confirmPassword']
    }
] as const;

export type signupSchema = z.infer<typeof signupSchema>;

const SignUp = ({ setIsRegestring }: { setIsRegestring: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const form = useForm<signupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            age: 18,
            userName: '',
            password: '',
            confirmPassword: '',
            email: '',
            gender: 'male',

        }
    })
    form.watch(["confirmPassword", "password"]);
    const handleNextClick = async (): Promise<void> => {
        {
            if (stepNo < steps.length && await form.trigger(steps[stepNo - 1].requireFileds))
                setStepNo(prev => prev + 1)
        }
    }
    const [showPass, setShowPass] = useState<boolean>(false);
    const [stepNo, setStepNo] = useState<number>(1);
    // const onSubmit = (values: signupSchema) => {
    // }
    const mutationSignup = useMutation({
        mutationFn: async (data: signupSchema): Promise<any> => { return await signupRequest(data) },
        onSuccess: (data: any) => {
            toast.success(data?.msg || "you should login now");
            setIsRegestring(false);
        },
        onError: (error) => {
            console.log(error);
        }
    })



    return (
        <Card className='w-full sign-up  p-6 gap-4 bg-background rounded-none'>
            <CardHeader className="p-0">

                <CardTitle className='text-2xl BitcountText text-ring font-extrabold text-center'>
                    Join the flow and unlock your potential
                </CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((values: signupSchema) => { mutationSignup.mutate(values) })} className="space-y-6">


                    {
                        stepNo == 1 &&
                        <>
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John44" className='rounded-[2px]' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John44@gmail.com" type='email' className='rounded-[2px]' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                        </>
                    }
                    {
                        stepNo == 2 &&
                        <>


                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full rounded-[2px]">
                                                    <SelectValue placeholder="select gender" />
                                                </SelectTrigger>
                                                <SelectContent >
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


                        </>
                    }

                    {/* step 3 */}
                    {
                        stepNo === 3 &&
                        <>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••••••" className='rounded-[2px] w-full' type={showPass ? 'text' : 'password'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className='relative w-full'>
                                                {
                                                    form.getValues('confirmPassword')?.length > 0 && (
                                                        showPass ?
                                                            <Eye className='w-4 cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' role='button' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }} />
                                                            :
                                                            <EyeOff className='w-4 cursor-pointer absolute top-[50%] translate-y-[-50%] right-[10px]' role='button' onClick={(e) => { e.preventDefault(); setShowPass(prev => !prev) }} />

                                                    )
                                                }

                                                <Input placeholder="••••••••••••" className='rounded-[2px] w-full' type={showPass ? 'text' : 'password'} {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    }

                    <ProgressSignup setStepNo={setStepNo} stepNo={stepNo} handleNextClick={handleNextClick} />

                    <Button
                        disabled={mutationSignup.isPending || stepNo != steps.length ||
                            (!form.getValues("password")) ||
                            (!form.getValues("confirmPassword"))

                        }
                        type="submit"
                        className='cursor-pointer w-full text-slate-200 rounded-none'>
                        Submit
                    </Button>

                </form>

            </Form>

            <div className='text-center'>
                or
            </div>
            <Button disabled={mutationSignup.isPending} className='cursor-pointer w-full rounded-none bg-zinc-600 text-slate-200' onClick={(e) => { e.preventDefault(); setIsRegestring(false) }}>
                already have account
            </Button>


        </Card>
    )
}

export default SignUp



