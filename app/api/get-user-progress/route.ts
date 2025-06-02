import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, courseId } = body;
        if (!userId || !userId) {
            return new NextResponse("Missing data", { status: 400 })
        }
        const purchase = await prisma.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        })
        if (!purchase) {
            return NextResponse.json({ progress: 0 })
        }
        const totalChapters = await prisma.chapter.count({
            where: {
                courseId
            }
        })
        if (totalChapters === 0) {
            return NextResponse.json({ progress: 0 })
        }
        const completedChapters = await prisma.userProgress.count({
            where: {
                userId,
                isCompleted: true,
                chapter: {
                    courseId
                }
            }
        })

        const progressPercentage = Math.round((completedChapters/totalChapters) * 100);
        return NextResponse.json({progress: progressPercentage})

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", {status:500})
    }
}