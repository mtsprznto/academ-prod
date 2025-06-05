import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
    try {
        const { userId } = await auth(); // ✅ Obtener userId desde Clerk

        if (!userId) {
            return NextResponse.json({ role: null });
        }

        const user = await prisma.user.findUnique({
            where: { userId },
            select: { role_id: true }
        });

        return NextResponse.json({ role: user?.role_id ?? null });
    } catch (error) {
        console.error("Error obteniendo rol de usuario:", error);
        return NextResponse.json({ role: null });
    }
};