import { z } from 'zod';
import { useFieldArray, useForm } from "react-hook-form"
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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const questionSchema = z.object({
    question: z.string().nonempty(),
    options: z.array(z.object({
        option: z.string().nonempty(),
        isCorrect: z.boolean(),
    })).min(2, "At least 2 options required").max(6, "Maximum 6 options allowed"),
    explanation: z.string().nonempty(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    id: z.uuid().optional()
})
export type questionType = z.infer<typeof questionSchema>;
const AddNewQuestion = ({ setNewQuestions }: { setNewQuestions: React.Dispatch<React.SetStateAction<questionType[] | null>> }) => {
    const form = useForm<questionType>({
        resolver: zodResolver(questionSchema),

        defaultValues: {
            question: "",
            explanation: "",
            difficulty: "easy",
            options: [{ option: "", isCorrect: true, }, { option: "", isCorrect: false }],
        }
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options"
    })
    form.watch("options");
    const handleCorrectOptionChange = (index: number) => {
        form.getValues("options").forEach((e, i) => {

            if (e.isCorrect)
                e.isCorrect = false

            if (i === index)
                e.isCorrect = true
        })
        console.log(form.getValues("options"), "after");
    }
    const handleAddNewOne = (data: questionType) => {
        const newQuestion = Object.assign(data);
        newQuestion.id = uuidv4();
        setNewQuestions((prev: questionType[] | null) => (prev ? [...prev, data] : [data]))
    }
    return (
        // <Card className='w-full px-3 bg-background shadow-md rounded-none'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data: questionType) => { handleAddNewOne(data); form.reset() })} className="space-y-3">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>question</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Question ..." className='rounded-[2px]'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    fields.map((e, i) => (

                        <FormField
                            key={e?.id}
                            control={form.control}
                            name={`options.${i}.option`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>option {i + 1}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="option text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                }
                {
                    <div className='space-y-4'>


                        <h1>which is the correct</h1>
                        <RadioGroup
                            defaultValue='0'
                            // value={form.watch("options").findIndex(opt => opt.isCorrect).toString()}
                            onValueChange={(value) => handleCorrectOptionChange(parseInt(value))}
                            className="flex flex-col gap-2"
                        >
                            <div className='grid grid-cols-3 gap-x-20 gap-y-4 w-fit'>
                                {
                                    fields.map((e, i) => (
                                        <div className="flex items-center gap-3" key={e.id}>
                                            <RadioGroupItem value={`${i}`} id={`correct-${i}`} />
                                            <label htmlFor={`correct-${i}`} className='text-md'>option {i + 1}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        </RadioGroup>
                    </div>
                }


                <FormField
                
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem className='w-full max-w-[500px]'>
                            <FormLabel>Course Type</FormLabel>
                            <FormControl >
                                <Select onValueChange={field.onChange} defaultValue="easy">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="select course type" />
                                    </SelectTrigger>
                                    <SelectContent  >
                                        <SelectGroup >
                                            <SelectLabel>Question Type</SelectLabel>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">hard</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type='button' disabled={fields.length >= 6} onClick={() => {
                    fields.length < 6 &&
                        append({ isCorrect: false, option: "" })
                }} className='cursor-pointer'>
                    new option <span className='text-xl'>+</span>
                </Button>


                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>explanation</FormLabel>
                            <FormControl>
                                <Textarea placeholder='explaination about correct answer' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type="submit" className='cursor-pointer w-full rounded-none text-slate-200'>Add Question</Button>


            </form>
        </Form>
    )
}

export default React.memo(AddNewQuestion)