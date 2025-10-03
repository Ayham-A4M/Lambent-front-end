import React from "react"
import { FaAngleLeft } from "react-icons/fa";
type props = {
    stepNo: number,
    setStepNo: React.Dispatch<React.SetStateAction<number>>,
    handleNextClick: () => void
}
const ProgressSignup = ({ stepNo, setStepNo, handleNextClick }: props) => {
    return (
        <div className='w-full space-y-1'>
            <div className="flex justify-center">
                <div className='w-full bg-gray-300 h-2 rounded-2xl duration-300'>
                    <div className='bg-primary h-full rounded-2xl transition-all duration-300' style={{ width: `${(stepNo / 3) * 100}%` }}></div>
                </div>
            </div>
            <div className={`flex ${stepNo > 1 ? "justify-between" : "justify-end"} w-full items-center `}>
                {
                    stepNo > 1 &&
                    <button className="p-1.5 rounded-full transition-colors duration-300 cursor-pointer hover:bg-primary hover:text-slate-200" onClick={() => { setStepNo(prev => prev - 1) }}><FaAngleLeft /></button>
                }

                {
                    stepNo < 3 &&
                    <button className="p-1.5 rounded-full transition-colors duration-300 cursor-pointer hover:bg-primary hover:text-slate-200" onClick={() => { handleNextClick() }}><FaAngleLeft className="rotate-180" /></button>
                    // <Button type="button" variant="outline" size="icon" className="text-[.5rem] cursor-pointer" >Next</Button>
                }
            </div>
        </div>
    )
}

export default React.memo(ProgressSignup)