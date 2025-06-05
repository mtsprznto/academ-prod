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


        // ✅ Verificar si el `userId` existe en la tabla `User`
        const existingUser = await prisma.user.findUnique({
            where: { userId },
        });
        if (!existingUser) {
            console.error("Error: El usuario no existe en la base de datos");
            return new NextResponse("User not found", { status: 404 });
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
        return new NextResponse("Internal error", { status: 500 })
    }
}