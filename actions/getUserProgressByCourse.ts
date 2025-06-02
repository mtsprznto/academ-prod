import prisma from "@/lib/prisma";
export const getUserProgressByCourse = async (userId: string, courseId: string): Promise<number> => {

    try {
        const purchase = await prisma.purchase.findFirst({
            where: {
                userId: userId,
                courseId: courseId
            }
        });

        if (!purchase) {
            return 0
        }

        const totalChapters = await prisma.chapter.count({
            where: {
                courseId,
            }
        })
        if (!totalChapters) return 0;

        const completedChapters = await prisma.userProgress.count({
            where: {
                userId,
                isCompleted: true,
                chapter: {
                    courseId,
                }
            }
        })
        const progressPercentage = Math.round((completedChapters / totalChapters) * 100);

        return progressPercentage;



    } catch (error) {
        console.log(error);
        return 0;

    }

}