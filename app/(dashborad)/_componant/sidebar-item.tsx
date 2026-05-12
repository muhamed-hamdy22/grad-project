"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}
export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}`);
    const onClick = () => {
        router.push(href);
    };
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center w-full p-3 text-sm font-medium rounded-md hover:bg-sky-200 transition-colors",
                isActive ? "bg-sky-200" : "bg-transparent hover:text-sky-700"
            )}
        >
            <div className="flex items-center space-x-3">
                <Icon
                    size={22}
                    className={cn("text-sky-700", isActive ? "text-gray-900" : "text-gray-500")}
                />
                {label}
            </div>
            <div 
            className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 transition-all , isActive && 'opacity-100'  ")}
            />
        </button>
    );
}