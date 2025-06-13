import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";


/*
STRIPE ENPOINT CHECKOUT
*/

export async function POST(req: Request, { params }: { params: Promise<{ courseId: string }> }) {

    const { userId } = await auth();
    const { courseId } = await params;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await currentUser();

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
            include: {
                chapters: {
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })

        if (!course) {
            return new NextResponse("Course not found", { status: 404 })
        }
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 })
        }

        const priceCourse = course.price ? Number(course.price.replace(",", ".")) : 0;

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "EUR",
                    product_data: {
                        name: course.title
                    },
                    unit_amount: Math.round(priceCourse * 100)
                }
            }
        ]

        let stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId: userId
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user?.emailAddresses[0].emailAddress
            })
            stripeCustomer = await prisma.stripeCustomer.create({
                data: {
                    userId: userId,
                    stripeCustomerId: customer.id
                }
            })
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items: line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}/${course.chapters[0].id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}?cancelled=1`,
            metadata: {
                courseId: course.id,
                userId: userId,
                price: course.price ? course.price.toString() : "0"
            },
        });


        return NextResponse.json({ url: session.url })


    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }


}