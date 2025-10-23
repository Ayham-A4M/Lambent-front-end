import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FiCheck, FiX, FiMoreVertical } from "react-icons/fi";

export type Option = {
    option: string;
    isCorrect: boolean;
};

export type QuestionProps = {
    question: string;
    options: Option[];
    explanation: string;
    difficulty: "easy" | "medium" | "hard";
    /**
     * Optional: renderable actions area in top-right (instructor controls).
     * Keep it non-functional here — pass elements like <Menu /> from parent.
     */
    actions?: React.ReactNode;
};

const difficultyStyle: Record<QuestionProps["difficulty"], string> = {
    easy: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    hard: "bg-red-100 text-red-700 border-red-200",
};

/**
 * Modern, production-ready QuestionCard for instructor (read-only)
 * - No framer-motion (hover/active uses Tailwind transitions only)
 * - Uses shadcn/ui primitives and Tailwind utility classes
 * - Accessible and responsive
 */
function QuestionCard({
    question,
    options,
    explanation,
    difficulty,
    actions,
}: QuestionProps) {
    return (
        <article className="w-full max-w-[400px] mx-auto">
            <Card className="rounded-xl bg-card gap-3">
                <CardHeader className="flex py-0 px-3 items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-foreground truncate">
                            {question} Instructor view — read only Instructor view — read only Instructor view — read only Instructor view — read only
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground hidden sm:block">
                            Instructor view — read only
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <Badge
                            className={cn(
                                "capitalize px-3 py-1 text-xs font-medium rounded-full border",
                                difficultyStyle[difficulty]
                            )}
                            aria-label={`difficulty: ${difficulty}`}>
                            {difficulty}
                        </Badge>

                        <div className="flex items-center">
                            {actions ? (
                                <div className="ml-1">{actions}</div>
                            ) : (
                                <button
                                    type="button"
                                    aria-label="question actions"
                                    className="inline-flex items-center justify-center rounded-full p-1 hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <FiMoreVertical className="text-muted-foreground" />
                                </button>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-3 pb-4 pt-2 space-y-5">
                    {/* Options list */}
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
