interface props {
    name: string,
    lessonNumber: number,
    description: string,
}
const LessonInformation = ({ lesson }: { lesson: props }) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3 text-xl text-primary">
                <h1>{lesson?.name}</h1>
                <span>#{lesson?.lessonNumber}</span>
            </div>
            <p className="text-sm">{lesson?.description}</p>
        </div>
    )
}

export default LessonInformation