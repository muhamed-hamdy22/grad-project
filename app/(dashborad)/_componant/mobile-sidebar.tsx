import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "./sidebar";

export const MobileSidebar = () => {
    return (
        <div>
        <Sheet>
            <SheetTrigger className=" pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <Sidebar />
            </SheetContent>
        </Sheet>
        </div>
    );
}