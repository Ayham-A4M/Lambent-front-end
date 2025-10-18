import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import Spinner from "../ui/spinner";


const lessonSchema = z.object({
    name: z.string().min(10, { message: "minimum length is 10" }).max(150, { message: "maximum length is 150" }),
    description: z.string().min(1, { message: "description is required field" }).max(1024, { message: "maximum length is 1024" }),
})
interface props {
    disableButtons: boolean,
    onSubmit: (data: any) => void
    description?: string,
    name?: string
}
export type lessonType = z.infer<typeof lessonSchema>;
const LessonDialog = ({ disableButtons, onSubmit, name, description }: props) => {

    const form = useForm<lessonType>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            name: name || "",
            description: description || "",
        }
    })
    return (
        <Dialog    >

            <DialogTrigger asChild>
                <Button className="cursor-pointer">New Lesson</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[550px] overflow-auto" onOpenAutoFocus={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Add Lesson</DialogTitle>
                </DialogHeader>

                <DialogDescription>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((data: lessonType) => { onSubmit(data) })} className="space-y-5 text-popover-foreground" >


                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Lesson Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Basic Introduction"   {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="(eg.) review some basics information..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <span>{form.getValues("description").length}/1024</span>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button disabled={disableButtons} type="button" variant="outline" className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={disableButtons} className="bg-zinc-700 text-slate-200 cursor-pointer">
                                    {
                                        disableButtons ?
                                            <Spinner talwindSize="size-6" />
                                            :
                                            "Save Lesson"
                                    }
                                </Button>
                            </DialogFooter>
                        </form>

                    </Form>

                </DialogDescription>

            </DialogContent>
        </Dialog >
    )
}

export default LessonDialog