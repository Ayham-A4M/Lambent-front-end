import CourseCard from '@/components/shared/course-card'
import SpinnerPage from '@/components/spinner-page'
import useGET from '@/hooks/useGet'
const Courses = () => {
    const { data, isLoading } = useGET(`/api/user/courses`, ["courses"]);
    return (
        <div className="w-full">
            {
                isLoading ?
                    <SpinnerPage />
                    :
                    <div className="flex items-center justify-between max-[1081px]:justify-evenly flex-wrap gap-y-4 relative">

                        {
                            data?.courses.map((e: any) => (
                                <CourseCard course={e} key={e?._id} />
                            ))
                        }
                    </div>

            }
        </div>
    )
}

export default Courses