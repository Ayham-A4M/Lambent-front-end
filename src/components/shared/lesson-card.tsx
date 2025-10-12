import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, FileText, Edit, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type LessonCardProps = {
    _id: string;
    description: string;
    lessonNumber: number;
    name: string;
    pagesNumber: number;
    viewsNumber: number;
    courseId: string
};

const LessonCard = ({ lesson, role }: { lesson: LessonCardProps, role: string }) => {
    return (
        <Card className="w-[98%] max-w-sm  hover:shadow-lg transition-all gap-y-3 duration-300 pb-5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold w-full">
                        <div className="flex items-center justify-between w-full pb-2">
                            {
                                role === "instructor"
                                    ?
                                    <Button variant="outline" className="rounded-xl size-8 dark:hover:bg-primary hover:bg-primary group">
                                        <Link to={`/instructor/courses/${lesson.courseId}/${lesson._id}/edit`} state={{lessonNumber:lesson.lessonNumber,name:lesson.name,description:lesson.description}} className="text-[.6rem] text-primary group-hover:text-slate-200">
                                            <Edit />
                                        </Link>
                                    </Button>
                                    :
                                    <Button variant="outline" className="rounded-xl size-8 dark:hover:bg-primary hover:bg-primary group">
                                        <Link to="/" className="text-[.6rem] text-primary group-hover:text-slate-200">
                                            <Play />
                                        </Link>
                                    </Button>
                            }
                            <span className="text-[.9rem] text-popover-foreground">Lesson #{lesson.lessonNumber}</span>
                        </div>
                        {lesson.name}
                    </CardTitle>

                </div>
            </CardHeader>

            <CardContent>
                <p className="dark:text-slate-200 text-[.7rem]">{lesson.description}</p>
            </CardContent>

            <CardFooter className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>{lesson.pagesNumber} pages</span>
                </div>

                <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-green-500" />
                    <span>{lesson.viewsNumber} views</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LessonCard;
