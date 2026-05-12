import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CategoryForm } from "./_components/category-form";
interface CourseIdPageProps {
    params: Promise<{
        coursesID: string;
    }>;
}
const coursesID = async ({
    params,
}:
    CourseIdPageProps) => {
    const { coursesID } = await params;


    const { userId } = await auth();
    if (!userId) {
        return redirect("/");
    }
    const course = await db.course.findUnique({
        where: {
            id: coursesID,
        },
    });
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
    })
    const options = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }))
    if (!course) {
        return redirect("/");
    }


    const requiredFielsd = [
        course.title,
        course.description,
        course.price,
        course.imageUrl,
        course.categoryId,
    ];
    const totalFields = requiredFielsd.length;
    const complatedFields = requiredFielsd.filter(Boolean).length;
    const comletionText = `${complatedFields} / ${totalFields} `;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        course setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        complete all Fielsd {comletionText}
                    </span>
                </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-4">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl font-semibold">
                            customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initalData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initalData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
export default coursesID;
