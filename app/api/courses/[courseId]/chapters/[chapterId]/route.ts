import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const muxTokenId = process.env.MUX_TOKEN_ID!;
const muxTokenSecret = process.env.MUX_TOKEN_SECRET!;

const mux = new Mux({
    tokenId: muxTokenId,
    tokenSecret: muxTokenSecret,
});
const { video } = mux;

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: { id: courseId, userId },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: { id: chapterId, courseId },
        });

        if (!chapter) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: { chapterId },
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: { id: existingMuxData.id },
                });
            }
        }

        const deletedChapter = await db.chapter.delete({
            where: { id: chapterId },
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: { courseId, isPublished: true },
        });

        if (publishedChaptersInCourse.length === 0) {
            await db.course.update({
                where: { id: courseId },
                data: { isPublished: false },
            });
        }

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.error("[DELETE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;
        const { isPublished, ...values } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: { id: courseId, userId },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedChapter = await db.chapter.update({
            where: { id: chapterId, courseId },
            data: { ...values, isPublished },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: { chapterId },
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({ where: { id: existingMuxData.id } });
            }

            const asset = await video.assets.create({
                inputs: [{ url: values.videoUrl }],
                playback_policies: ["public"],
                test: false,
            });
            await db.muxData.create({
                data: {
                    chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(updatedChapter);
    } catch (error) {
        console.error("[PATCH_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}