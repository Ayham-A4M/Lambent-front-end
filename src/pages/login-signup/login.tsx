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
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: 'passowrd minimum length is 8' }).max(30, 'password maximum length is 30'),
  isInstructor: z.boolean()
})
import { useNavigate } from 'react-router-dom';
import loginRequest from './handler/loginRequest';
import useUser from '@/hooks/useUser';
import compareTwoDate from '@/helper/compareTwoDate';
import { Checkbox } from '@/components/ui/checkbox';
export type loginType = z.infer<typeof loginSchema>;

const Login = ({ setIsRegestring }: { setIsRegestring: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isInstructor: false,
    }
  })
  form.watch(["email", "password"]);

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const USER = useUser();
  const mutation = useMutation({
    mutationFn: async (data: loginType): Promise<any> => { return await loginRequest(data) },
    onSuccess: (data) => {
      toast.success(data?.msg || "logged in successfully");
      if (USER) {
        USER?.setUserName(data?.userName);
        USER?.setRole(data?.role);

      }

      if (data?.role === "user") {
        if (USER) {
          USER?.setIsThereStreakToday(compareTwoDate(new Date(data?.lastDateStreak), new Date()))
        }
        navigate("/user-dashboard", { replace: true });
      } else if (data?.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else if (data?.role === "instructor") {
        navigate("/instructor/dashboard", { replace: true });
      }
    },
    onError: (error) => {
      console.log(error);
    }
  })


  return (
    <Card className='w-[98%] max-w-[450px] p-6 gap-4 bg-background shadow-md rounded-none  '>
      <CardTitle className='text-2xl BitcountText text-ring font-extrabold text-center'>
        Welcome Back
      </CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data: loginType) => { mutation.mutate(data) })} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John44@gmail.com" className='rounded-[2px]'  {...field} />
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

                    <Input placeholder="••••••••••••" className='rounded-[2px]' type={showPass ? 'text' : 'password'} {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isInstructor"
            render={({ field }) => (
              <FormItem className='flex items-center gap-3 justify-end'>
                <FormLabel>I am instructor</FormLabel>
                <FormControl>
                  <Checkbox
                    className='rounded-[2px]'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button disabled={!form.getValues("password") || !form.getValues("email") || mutation.isPending} type="submit" className='cursor-pointer w-full rounded-none text-slate-200'>Submit</Button>
          <div className='text-center'>
            or
          </div>
          <Button disabled={mutation.isPending} className='cursor-pointer w-full rounded-none bg-zinc-600 text-slate-200' onClick={(e) => { e.preventDefault(); setIsRegestring(true) }}>
            dont have account
          </Button>

        </form>
      </Form>
    </Card>
  )
}

export default Login



