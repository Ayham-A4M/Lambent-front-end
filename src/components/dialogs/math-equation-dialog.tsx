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

import { Input } from "../ui/input"

const MathEquationDialog = ({ open, onClose, setEquation, equation, onSubmit }: { open: boolean, onClose: () => void, setEquation: React.Dispatch<string>, equation: string, onSubmit: () => void }) => {
    return (
        <Dialog open={open} onOpenChange={() => { onClose() }}>
            <DialogContent className="max-h-[550px] overflow-auto" onOpenAutoFocus={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Insert Equation</DialogTitle>
                    <div className="text-start text-[.8rem]">
                        E=m*c^2
                    </div>
                </DialogHeader>

                <DialogDescription>
                    <Input type="text" value={equation} onChange={(e) => { setEquation(e.target.value) }} />
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer" onClick={() => { onClose() }}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-gray-500 text-slate-200 cursor-pointer" onClick={() => { onSubmit(); onClose() }}>
                        Insert
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog >
    )
}

export default MathEquationDialog