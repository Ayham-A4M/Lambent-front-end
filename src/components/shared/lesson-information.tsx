import { Eye } from 'lucide-react'
interface props {
    name: string,
    lessonNumber: number,
    viewsNumber: number,
    description: string,
}
const LessonInformation = ({ lesson }: { lesson: props }) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3 text-xl text-primary">
                <h1>{lesson?.name}</h1>
                <span>#{lesson?.lessonNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-md text-primary">
                <p >Views : {lesson?.viewsNumber}</p>
                <Eye className="size-5" />
            </div>
            <p className="text-sm">{lesson?.description}</p>
        </div>
    )
}

export default LessonInformation