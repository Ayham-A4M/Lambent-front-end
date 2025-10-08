import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// import Image from "next/image";
import { Star, PlayCircle } from "lucide-react";
import cs from "../../assets/course-images/cs.png"
import math from "../../assets/course-images/math.png"
import chem from "../../assets/course-images/chem.png"
import phy from "../../assets/course-images/physics.png"
export type Course = {
  id?: string | number;
  image: string; // url or static import
  name: string;
  category: string; // e.g. "Mathematics", "Physics"
  priceType: "free" | "subscription" | "one-time";
  description?: string;
  lessons?: number;
  duration?: string; // e.g. "4h 30m"
  rating?: number; // 0-5
};

type Props = {
  course: Course;
  onClick?: (course: Course) => void;
  className?: string;
};

export default function CourseCard({ course, onClick, className }: Props) {
  const {
    image,
    name,
    category,
    priceType,
    description = "No description provided.",
    lessons = 0,
    duration = "",
    rating = 0,
  } = course;

  const priceLabel =
    priceType === "free"
      ? "Free"
      : priceType === "subscription"
      ? "Subscription"
      : "One-time";

  return (
    <Card className={cn("max-w-sm rounded-2xl pt-0 shadow-lg overflow-hidden dark:bg-zinc-800", className)}>
      <div className="relative h-44 w-full bg-muted/50">
        <img
          src={image}
          alt={`Course image for ${name}`}
          className="object-cover w-full h-full"
         
        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="uppercase text-xs">
            {category}
          </Badge>
          <Badge
            className={cn(
              "text-xs",
              priceType === "free" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            )}
          >
            {priceLabel}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{description}</p>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{rating.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4" />
                <span>{lessons} lessons</span>
              </div>

              {duration ? <span>• {duration}</span> : null}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button size="sm" variant={priceType === "free" ? "outline" : "default"} onClick={() => onClick?.(course)}>
              {priceType === "free" ? "Start" : "View"}
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{category} • {priceLabel}</div>
          <div className="text-xs">{course.id ? `#${course.id}` : null}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

// --- Demo data for testing ---
export const demoCourses: Course[] = [
  {
    id: 1,
    image:math,
    name: "Introduction to Calculus",
    category: "Mathematics",
    priceType: "subscription",
    description: "Learn the fundamentals of calculus including limits, derivatives, and integrals.",
    lessons: 25,
    duration: "6h 30m",
    rating: 4.8,
  },
  {
    id: 2,
    image:phy,
    name: "Physics for Beginners",
    category: "Physics",
    priceType: "free",
    description: "Understand the core principles of motion, forces, and energy.",
    lessons: 18,
    duration: "4h 10m",
    rating: 4.5,
  },
  {
    id: 3,
    image: chem,
    name: "Organic Chemistry Basics",
    category: "Chemistry",
    priceType: "one-time",
    description: "Explore organic compounds, reactions, and molecular structures.",
    lessons: 30,
    duration: "8h 15m",
    rating: 4.7,
  },
  {
    id: 4,
    image: cs,
    name: "Modern Web Development",
    category: "Programming",
    priceType: "subscription",
    description: "Build responsive websites using HTML, CSS, JavaScript, and React.",
    lessons: 40,
    duration: "10h",
    rating: 4.9,
  },
];

/*
Usage example:

import CourseCard, { demoCourses } from "./CourseCard";

export default function CourseGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {demoCourses.map((course) => (
        <CourseCard key={course.id} course={course} onClick={() => alert(`Open ${course.name}`)} />
      ))}
    </div>
  );
}
*/
