"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.startsWith("/chapter");

    return (
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isPlayerPage ? (
                <Link href="/teacher/courses">
                    <button>
                        <LogOut className="h-4 w-4 mr-2" />
                        exit
                    </button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    );
};

export default NavbarRoutes;
