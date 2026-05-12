"use client";
import { usePathname } from "next/navigation";
import { Layout, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
const guestRoutes = [
    {
        icon: Layout,
        label: "Home",
        href: "/"
    },
    {
        icon: Compass,
        label: "Login",
        href: "/search"
    }
];
const teacherRoutes = [
    {
        icon: List,
        label: "courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/Analytics"
    }
];
export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col   w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}

                />

            ))}

        </div>
    )
}
export default SidebarRoutes;