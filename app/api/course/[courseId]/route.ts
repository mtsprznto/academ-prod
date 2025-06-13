import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/*
MERCADO PAGO ENPOINT CHECKOUT
*/

export async function PATCH(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Verificar si el curso existe y está publicado
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
        });
        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        // Verificar si el usuario ya compró el curso
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        }

        
        // Verificar si el cliente de MercadoPago ya existe
        let mercadoPagoCustomer = await prisma.mercadoPagoCustomer.findUnique({
            where: {
                userId: userId,
            },
            select: {
                mercadoPagoCustomerId: true,
            },
        });

        if (!mercadoPagoCustomer) {
            mercadoPagoCustomer = await prisma.mercadoPagoCustomer.create({
                data: {
                    userId: userId,
                    mercadoPagoCustomerId: `mp_${userId}`, 
                },
            });
        }

        // Actualizar la base de datos con los valores proporcionados
        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId,
                userId: userId,
            },
            data: {
                ...values,
            },
        });

        // Registrar la compra en la tabla de compras
        await prisma.purchase.create({
            data: {
                userId,
                courseId,
                price: values.price,
            },
        });

        return NextResponse.json(updatedCourse);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const { courseId } = await params;
        const course = await prisma.course.delete({
            where: {
                id: courseId,
                userId: userId
            }
        })
        return NextResponse.json(course);



    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 })

    }
}