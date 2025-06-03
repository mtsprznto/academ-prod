import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const { courseName, slug } = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const course = await prisma.course.create({
            data: {
                userId,
                title: courseName,
                slug,
            }
        })
        revalidatePath("/courses");
        revalidatePath("/");

        
        return NextResponse.json(course);


    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", {status:500})
    }
}