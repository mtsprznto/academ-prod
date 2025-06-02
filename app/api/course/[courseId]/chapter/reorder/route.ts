import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const { list } = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const ownCourse = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        })
        if (!ownCourse) {
            return new NextResponse("Course not found", { status: 404 })
        }
        for (const item of list) {
            await prisma.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
        }
        return new NextResponse("Success", { status: 200 })
    } catch (error) {
        console.log(error);

        return new NextResponse("Internal Server error", { status: 500 })

    }
}