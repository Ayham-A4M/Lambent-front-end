import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FiCheck, FiX, FiMoreVertical } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { questionType } from "./add-new-question";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export type Option = {
    option: string;
    isCorrect: boolean;
};

export type QuestionProps = {
    question: string;
    options: Option[];
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
    _id?: string,
    setEditQuestion: React.Dispatch<React.SetStateAction<questionType | null>>
    setDeleteQuestionId: React.Dispatch<React.SetStateAction<string>>
};

const difficultyStyle: Record<QuestionProps["difficulty"], string> = {
    easy: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    hard: "bg-red-100 text-red-700 border-red-200",
};


function QuestionCard({
    question,
    options,
    explanation,
    difficulty,
    _id,
    setEditQuestion,
    setDeleteQuestionId,
}: QuestionProps) {

    return (
        <article className="w-full  relative">
            <Card className="rounded-xl bg-card gap-3">
                <CardHeader className="flex py-0 px-3 items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-foreground truncate">
                            {question}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground hidden sm:block">
                            Instructor view — read — edit
                        </p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <Badge
                            className={cn(
                                "capitalize px-3 py-1 text-xs font-medium rounded-full border",
                                difficultyStyle[difficulty]
                            )}
                            aria-label={`difficulty: ${difficulty}`}>
                            {difficulty}
                        </Badge>

                        <div className="flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="outline" size="icon" className="rounded-full cursor-pointer size-8">
                                        <FiMoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Question Config</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => { if (_id) { setDeleteQuestionId(_id) } }}>Delete</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setEditQuestion({ question, difficulty, explanation, options, _id }) }}>Edit</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-3 pb-4 pt-2 space-y-5">
                    <ul className="space-y-3">
                        {options.map((opt, idx) => (
                            <li key={idx}>
                                <div
                                    className={`
                    flex items-center justify-between gap-3 rounded-xl border px-4 py-1 text-sm transition-shadow duration-150
                    ${opt.isCorrect ? "border-green-400 border-2  shadow-sm" : "border-border bg-muted/30"}
                  `}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="inline-flex size-8 rounded-lg shrink-0 items-center justify-center  bg-muted text-xs font-medium">
                                            {String.fromCharCode(65 + idx)}
                                        </span>

                                        <p className="truncate text-sm font-medium text-foreground">{opt.option}</p>
                                    </div>

                                    <div className="ml-4 flex items-center justify-end">
                                        {opt.isCorrect ? (
                                            <span className="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-xs font-medium border border-green-300 bg-green-200">
                                                <FiCheck className="text-green-600" />
                                                <span className="text-green-700 ">Correct</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground">
                                                <FiX />
                                                <span className="hidden sm:inline">Incorrect</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Separator />
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Explanation</h4>
                        <div className="rounded-lg border border-border bg-muted/40 p-4 py-2 text-sm leading-relaxed text-foreground break-words">
                            {explanation}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </article>
    );
}
export default QuestionCard
