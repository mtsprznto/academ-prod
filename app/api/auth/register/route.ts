import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const POST = async () => {
    try {
        const { userId } = await auth();

        console.log("Intentando registrar usuario:", userId);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { userId }
        });

        if (!existingUser) {
            console.log("Usuario no encontrado, insertando en Neon...");
            await prisma.user.create({
                data: {
                    userId,
                    role_id: 2, // ✅ Rol MIEMBRO por defecto
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
            console.log("Usuario registrado correctamente en Neon.");
        } else {
            console.log("El usuario ya existe en Neon.");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error en registro:", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};