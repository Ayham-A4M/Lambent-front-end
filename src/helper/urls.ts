import { PiMedalFill } from "react-icons/pi";
import { RiBookShelfFill } from "react-icons/ri";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GiBookmarklet } from "react-icons/gi";
import { FcMindMap } from "react-icons/fc";
import { FaUsersCog,FaChalkboardTeacher } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import type { IconType } from "react-icons/lib";
interface urlType {
    title: string,
    url: string,
    icon: IconType,
    icon_talwind_color: string
}
interface urlsObj {
    user: urlType[],
    admin: urlType[],
    [key: string]: urlType[],

}
export const urls: urlsObj = {

    user: [
        {
            title: "Dashboard",
            url: "/user-dashboard",
            icon: RiDashboardHorizontalFill,
            icon_talwind_color: "text-primary"
        },
        {
            title: "Courses",
            url: "/courses",
            icon: RiBookShelfFill,
            icon_talwind_color: "text-green-500"
        },
        {
            title: "Badges",
            url: "/badges",
            icon: PiMedalFill,
            icon_talwind_color: "text-yellow-400"
        },
        {
            title: "Quizzes",
            url: "/quizzes",
            icon: FcMindMap,
            icon_talwind_color: ""
        },
        {
            title: "My Courses",
            url: "/my-courses",
            icon: GiBookmarklet,
            icon_talwind_color: "text-red-400"
        }

    ],
    // instructor: [

    // ],
    admin: [
        {
            title: "Dashboard",
            url: "/admin-dashboard",
            icon: RiDashboardHorizontalFill,
            icon_talwind_color: "text-primary"
        },
        {
            title: "Users",
            url: "/all-users",
            icon: FaUsersCog,
            icon_talwind_color: "text-green-400"
        },
        {
            title: "Instructors",
            url: "/instructors",
            icon: FaChalkboardTeacher,
            icon_talwind_color: "text-orange-400"
        },
        {
            title: "New Instructor",
            url: "/new-instructor",
            icon: IoMdPersonAdd,
            icon_talwind_color: "text-blue-400"
        },
    ]
}
