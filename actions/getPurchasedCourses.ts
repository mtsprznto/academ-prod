import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Chapter, Course } from "@prisma/client";

export const getPurchasedCourses = async (): Promise<
    (Course & { chapters: Chapter[] })[] | null
> => {
    const user = await currentUser();
    if (!user?.id) {
        throw new Error("The user has not been identified.");
    }

    try {
        const purchasedCourses = await prisma.course.findMany({
            where: {
                purchases: {
                    some: {
                        userId: user.id
                    }
                },
                isPublished: true
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    }
                }
            }
        });
        return purchasedCourses;
    } catch (error) {
        console.log(error);
        return [];

    }

}