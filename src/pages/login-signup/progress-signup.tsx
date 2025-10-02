import React from "react"
import { Button } from "@/components/ui/button"
type props = {
    stepNo: number,
    setStepNo: React.Dispatch<React.SetStateAction<number>>,
}
const ProgressSignup = ({ stepNo, setStepNo }: props) => {
    return (
        <div className='w-full space-y-1'>
            <div className="flex justify-center">
                <div className='w-full bg-gray-300 h-2 rounded-2xl duration-300'>
                    <div className='bg-primary h-full rounded-2xl' style={{ width: `${(stepNo / 3) * 100}%` }}></div>
                </div>
            </div>
            <div className={`flex ${stepNo>1?"justify-between":"justify-end"} w-full items-center `}>
                {
                    stepNo > 1 &&
                    <Button type="button" variant="outline" size="icon" className="text-[.5rem] cursor-pointer" onClick={() => { setStepNo(prev => prev - 1) }}>Back</Button>
                }

                {
                    stepNo < 3 &&
                    <Button type="button" variant="outline" size="icon" className="text-[.5rem] cursor-pointer" onClick={() => { setStepNo(prev => prev + 1) }}>Next</Button>
                }
            </div>
        </div>
    )
}

export default React.memo(ProgressSignup)