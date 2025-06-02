import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const getUserPurchases = async (userId: string) => {
    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                }
            }
        })

        const formattedPurchases = purchases.map((purchase) => ({
            ...purchase,
            createdAtFormatted: format(purchase.createdAt, "dd/MM/yyyy", {
                locale: es
            })
        }))

        return formattedPurchases;

    } catch (error) {
        console.log(error);
        return [];


    }
}