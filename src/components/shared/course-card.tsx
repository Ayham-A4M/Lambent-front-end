import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { PiGraduationCap } from "react-icons/pi";
import { Star, PlayCircle } from "lucide-react";
import useUser from "@/hooks/useUser";
import { Link } from "react-router-dom";
export type Course = {
  _id: string;
  image: string; // url or static import
  name: string;
  type: string; // e.g. "Mathematics", "Physics"
  isFree: boolean;
  description: string;
  totalLessons: number;
  totalLearners: string; // e.g. "4h 30m"
  rating: number; // 0-5
};

type Props = {
  course: Course;
  onClick?: (course: Course) => void;
  className?: string;

};

export default function CourseCard({ course, onClick, className }: Props) {
  const USER = useUser()

  return (
    <Card className={cn("max-w-sm rounded-2xl pt-0 shadow-lg overflow-hidden bg-card", className)}>
      <div className="relative h-44 w-full bg-muted/50">
        <img
          src={`http://localhost:8000${course?.image}`}
          alt={`Course image for ${course.name}`}
          className="object-cover w-full h-full"

        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="uppercase text-xs">
            {course.type}
          </Badge>
          <Badge
            className={cn(
              "text-xs",
              course.isFree ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            )}
          >
            {course.isFree ? "free" : "subscription"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">{course.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{course.description}</p>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="size-4" />
                <span>{course.rating.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-1">
                <PlayCircle className="size-4" />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <PiGraduationCap className="size-4" />
                <span>{course.totalLearners} learners</span>
              </div>

            </div>
          </div>

          <div className="flex-shrink-0">
            {
              USER&& 
              <>
                {
                  USER?.role === "instructor" ?
                    <div className="w-fit flex flex-col gap-y-2">
                      <Button size="icon" variant={"outline"} type="button" className="rounded-xl">
                        <Link to={`/instructor/courses/${course?._id}`}><Eye /></Link>
                      </Button>
                      <Button size="icon" variant={"outline"} type="button" className="rounded-xl">
                        <Link to={`/instructor/courses/${course?._id}/edit`} state={course}><Edit /></Link>
                      </Button>

                    </div>
                    :
                    <Button size="sm" className="text-slate-100" onClick={() => onClick?.(course)}>
                      View
                    </Button>
                }
              </>

            }
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{course.type} • {course.isFree ? "Free" : "subscription"}</div>
          <div className="text-xs">{course._id ? `#${course._id.slice(0, 5)}` : null}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

// --- Demo data for testing ---
// export const demoCourses: Course[] = [
//   {
//     id: 1,
//     image: math,
//     name: "Introduction to Calculus",
//     category: "Mathematics",
//     priceType: "subscription",
//     description: "Learn the fundamentals of calculus including limits, derivatives, and integrals.",
//     lessons: 25,
//     duration: "6h 30m",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     image: phy,
//     name: "Physics for Beginners",
//     category: "Physics",
//     priceType: "free",
//     description: "Understand the core principles of motion, forces, and energy.",
//     lessons: 18,
//     duration: "4h 10m",
//     rating: 4.5,
//   },
//   {
//     id: 3,
//     image: chem,
//     name: "Organic Chemistry Basics",
//     category: "Chemistry",
//     priceType: "one-time",
//     description: "Explore organic compounds, reactions, and molecular structures.",
//     lessons: 30,
//     duration: "8h 15m",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     image: cs,
//     name: "Modern Web Development",
//     category: "Programming",
//     priceType: "subscription",
//     description: "Build responsive websites using HTML, CSS, JavaScript, and React.",
//     lessons: 40,
//     duration: "10h",
//     rating: 4.9,
//   },
// ];

