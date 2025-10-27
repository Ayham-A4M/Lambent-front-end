import { Button } from "@/components/ui/button"
import useGET from "@/hooks/useGet"
const Quiz = () => {

    return (
        <div className="w-full flex gap-40">
            <div className="w-[83%] space-y-6">
                <div className="w-full space-y-3">
                    <h1 className="text-3xl font-bold">Mathimatics Quiz</h1>
                    <div className="flex items-center gap-2">
                        <div className="w-full rounded-xl h-2 bg-slate-200">
                            <div className="rounded-xl h-full w-[76%] bg-primary">

                            </div>
                        </div>
                        <span>76%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="font-bold mr-1">Question 7/12 :</span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus explicabo quas obcaecati, quo doloremque expedita? Mollitia quaerat ut, officiis molestiae praesentium, nostrum dolorem aperiam vitae, doloribus ab quo a consequuntur.
                </div>
                <span className="font-semibold">
                    Answers :
                </span>
                <div className="space-y-6">
                    <div className="w-full bg-slate-200 rounded-xl flex items-center gap-4 py-3 px-2">
                        <div className="size-6 rounded-lg text-center bg-primary text-slate-200">
                            A
                        </div>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium at, maxime nulla voluptatem ea ex ab unde. </span>

                    </div>
                    <div className="w-full bg-slate-200 rounded-xl flex items-center gap-4 py-3 px-2">
                        <div className="size-6 rounded-lg text-center bg-primary text-slate-200">
                            B
                        </div>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium at, maxime nulla voluptatem ea ex ab unde. </span>

                    </div>
                    <div className="w-full bg-slate-200 rounded-xl flex items-center gap-4 py-3 px-2">
                        <div className="size-6 rounded-lg text-center bg-primary text-slate-200">
                            C
                        </div>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium at, maxime nulla voluptatem ea ex ab unde. </span>

                    </div>
                    <div className="w-full bg-slate-200 rounded-xl flex items-center gap-4 py-3 px-2">
                        <div className="size-6 rounded-lg text-center bg-primary text-slate-200">
                            D
                        </div>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium at, maxime nulla voluptatem ea ex ab unde. </span>

                    </div>
                </div>

                <div className="w-full flex justify-end items-center gap-2">
                    <Button className="rounded-xl cursor-pointer border-3 border-primary  text-primary font-bold" variant="outline">
                        Previous
                    </Button>
                    <Button className="bg-primary rounded-xl text-slate-200 cursor-pointer font-bold">
                        Submit
                    </Button>

                </div>


            </div>







            <div className="space-y-6 w-[17%] flex flex-col items-center">
                <div className="flex flex-col w-full max-w-[300px] gap-1 items-center justify-center px-2.5 py-4 bg-slate-200 rounded-xl">
                    <h1 className="font-bold text-2xl">82.8%</h1>
                    <span className="text-[.8rem] text-gray-500">you get 5 answers correct</span>
                </div>
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-200">
                        <div className="size-5 rounded-full bg-white"></div>
                        <span>Question 1</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz