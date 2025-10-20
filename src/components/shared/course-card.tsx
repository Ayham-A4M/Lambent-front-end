import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PiGraduationCap } from "react-icons/pi";
import { Star, PlayCircle } from "lucide-react";
import AccessCourseCardButtons from "../access-course-card-buttons";
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
  hasAccess?: boolean,
};

type Props = {
  course: Course;
  onClick?: (course: Course) => void;
  className?: string;

};

export default function CourseCard({ course, className }: Props) {

  return (
    <Card className={cn("max-w-sm rounded-2xl pt-0 shadow-lg overflow-hidden bg-card", className)}>
      <div className="relative h-44 w-full bg-muted/50">
        <img
          src={`http://localhost:8000${course?.image}`}
          alt={`Course image for ${course?.name}`}
          className="object-cover w-full h-full"

        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs rounded-[6px]">
            {course?.type}
          </Badge>
          <Badge
            className={cn(
              "text-xs rounded-[6px]",
              course?.isFree ? "bg-emerald-100  text-emerald-800" : "bg-amber-100 text-amber-800"
            )}
          >
            {course?.isFree ? "free" : "subscription"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">{course?.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{course?.description}</p>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="size-4" />
                <span>{course?.rating.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-1">
                <PlayCircle className="size-4" />
                <span>{course?.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <PiGraduationCap className="size-4" />
                <span>{course?.totalLearners} learners</span>
              </div>

            </div>
          </div>

          <div className="flex-shrink-0">
            <AccessCourseCardButtons course={course} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{course?.type} • {course?.isFree ? "Free" : "subscription"}</div>
          <div className="text-xs">{course?._id ? `#${course?._id.slice(0, 5)}` : null}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

