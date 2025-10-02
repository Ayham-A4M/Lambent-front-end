import { PiMedalFill } from "react-icons/pi";
import { RiBookShelfFill } from "react-icons/ri";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GiBookmarklet } from "react-icons/gi";
import { FcMindMap } from "react-icons/fc";
export const urls = {

    user: [
        {
            title: "Home",
            url: "/",
            icon:RiDashboardHorizontalFill,
            icon_talwind_color:"text-blue-500"
        },
        {
            title: "Dashboard",
            url: "/user-dashboard",
            icon: RiDashboardHorizontalFill,
            icon_talwind_color:"text-primary"
        },
        {
            title: "Courses",
            url: "/courses",
            icon: RiBookShelfFill,
            icon_talwind_color:"text-green-500"
        },
        {
            title: "Badges",
            url: "/badges",
            icon: PiMedalFill,
            icon_talwind_color:"text-yellow-400"
        },
        {
            title:"Quizzes",
            url:"/quizzes",
            icon:FcMindMap,
            icon_talwind_color:""
        },
        {
            title: "My Courses",
            url: "/my-courses",
            icon: GiBookmarklet,
            icon_talwind_color:"text-red-400"
        }

    ],
    // instructor: [

    // ],
    // admin: [

    // ]
}
