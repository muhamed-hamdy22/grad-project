import { Logo } from "./logo";
import {  SidebarRoutes } from "./sidebar-routes";
const Sidebar = () => {
    return (
        <div className="hidden md:flex items-center h-full w-56 flex-col fixed inset-y-0 z-50 justify-between p-4 border-r">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col items-center space-y-4 w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default Sidebar;