import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const course = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId
            },
            data: {
                ...values
            }
        })
        return NextResponse.json(course)

    } catch (error) {
        console.log(error);

        return new NextResponse("Internal server error", { status: 500 })

    }

}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId, chapterId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const chapter = await prisma.chapter.delete({
            where: {
                id: chapterId,
                courseId: courseId,
            }
        })
        return NextResponse.json(chapter);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}