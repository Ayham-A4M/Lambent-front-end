import { Button } from "../ui/button"
import { Home, User, MessageCircle, Users, Calendar } from "lucide-react";

const MobileNav = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0  border-t backdrop-blur-sm z-50">
            <div className="flex items-center justify-around py-2">
                <Button variant="ghost"  size="icon" className="flex-col gap-1 h-12 text-primary">
                    <Home className="w-5 h-5" />
                    <span className="text-xs">Home</span>
                </Button>
                <Button variant="ghost" size="icon" className="flex-col gap-1 h-12">
                    <Users className="w-5 h-5" />
                    <span className="text-xs">Friends</span>
                </Button>
                <Button variant="ghost" size="icon" className="flex-col gap-1 h-12">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs">Messages</span>
                </Button>
                <Button variant="ghost" size="icon" className="flex-col gap-1 h-12">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs">Events</span>
                </Button>
                <Button variant="ghost" size="icon" className="flex-col gap-1 h-12">
                    <User className="w-5 h-5" />
                    <span className="text-xs">Profile</span>
                </Button>
            </div>
        </nav>
    )
}

export default MobileNav