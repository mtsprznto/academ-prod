import prisma from "@/lib/prisma";

export const getIsPurchasedCourse = async (userId: string, courseId: string): Promise<boolean> => {
    try {
        const purchase = await prisma.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        })

        return !!purchase;

    } catch (error) {
        console.log(error);
        return false;
    }
}