import { Button } from './ui/button'
import { Link, replace, useNavigate } from 'react-router-dom'
import { Edit, Eye } from 'lucide-react'
import useUser from '@/hooks/useUser'
import { type Course } from './shared/course-card'
import usePOST from '@/hooks/usePOST'
import Spinner from './ui/spinner'
const AccessCourseCardButtons = ({ course }: { course: Course }) => {
    const USER = useUser();
    const navigate = useNavigate();
    const mutation1 = usePOST(`/api/user/courses/${course?._id}/join`, ["courses"], () => { navigate(`/courses/${course?._id}`, { replace: true, state: { courseType: course?.type } }) })
    return (
        <>
            {
                USER &&
                <>
                    {
                        USER?.role === "instructor" ?
                            <div className="w-fit flex flex-col gap-y-2">
                                <Button size="icon" variant={"outline"} type="button" className="rounded-xl">
                                    <Link to={`/instructor/courses/${course?._id}`} state={{ courseType: course?.type }}><Eye /></Link>
                                </Button>
                                <Button size="icon" variant={"outline"} type="button" className="rounded-xl">
                                    <Link to={`/instructor/courses/${course?._id}/edit`} state={course}><Edit /></Link>
                                </Button>

                            </div>
                            :
                            <>
                                {
                                    course?.hasAccess ?
                                        <Button size="sm" className="text-slate-100 bg-green-400 rounded-[6px]" type="button">
                                            <Link to={`/courses/${course?._id}`} state={{ courseType: course?.type }} className="flex text-[.8rem] items-center gap-1">
                                                continue
                                            </Link>
                                        </Button>
                                        :
                                        course.isFree ?
                                            <Button size="sm" className="text-slate-100 cursor-pointer rounded-[6px]" onClick={() => {
                                                mutation1.mutation.mutate();
                                            }}>
                                                {
                                                    mutation1.mutation?.isPending ?
                                                        <Spinner talwindSize='size-5' />
                                                        :
                                                        "Join"
                                                }
                                            </Button>
                                            :
                                            <Button className="cursor-pointer">
                                                no access
                                            </Button>
                                }
                            </>
                    }
                </>

            }
        </>
    )
}

export default AccessCourseCardButtons