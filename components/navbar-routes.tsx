"use client";

import { Suspense } from 'react';
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";

function SearchBarFallback() {
    return <>placeholder</>;
}

function getNavButton(isTeacherPage: boolean, isCoursePage: boolean, userId: string) {
    if ( isCoursePage) {
        return (
            <Link href="/search">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" />
                    Exit
                </Button>
            </Link>
        );
    }

    

    return null;
}

export const NavbarRoutes = () => {
    const userId = `${process.env.NEXT_PUBLIC_TEACHER_ID}`;
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher") ?? false;
    const isCoursePage = pathname?.includes("/courses") ?? false;
    const isSearchPage = pathname === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <Suspense fallback={<SearchBarFallback />}>
                        <SearchInput />
                    </Suspense>
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {getNavButton(isTeacherPage, isCoursePage, userId)}
            </div>
        </>
    );
};