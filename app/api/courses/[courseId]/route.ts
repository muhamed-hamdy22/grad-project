import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
const { video } = mux;

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    const { courseId } = await params; // ← await

    if (!courseId) {
        return new NextResponse("Course ID is required", { status: 400 });
    }

    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: { id: courseId, userId },
            include: {
                chapters: {
                    include: { muxData: true },
                },
            },
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                try {
                    await video.assets.delete(chapter.muxData.assetId);
                } catch (muxError) {
                    console.error(`[MUX_ASSET_DELETE_ERROR]`, muxError);
                }
            }
        }

        const deletedCourse = await db.course.delete({
            where: { id: courseId },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.error("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> } // ← Promise
) {
    const { courseId } = await params; // ← await

    if (!courseId) {
        return new NextResponse("Course ID is required", { status: 400 });
    }

    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const values = await req.json();

        const updatedCourse = await db.course.update({
            where: { id: courseId, userId },
            data: { ...values },
        });

        return NextResponse.json(updatedCourse);
    } catch (error) {
        console.error("[COURSE_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}