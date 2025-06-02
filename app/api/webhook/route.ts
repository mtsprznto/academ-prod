import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from '@/lib/stripe';
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("stripe-signature") as string

    let event: Stripe.Event

    
    
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.log(error);
        return new NextResponse("Webhook error", { status: 499 })
        
    }
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId
    const coursePrice = session?.metadata?.price
    
    
    const price = coursePrice ? Number(coursePrice.replace(",", ".")) : 0;
    
    console.log("🔄 Webhook recibido:", event.type);
    console.log("📌 Metadata:", session.metadata);
    
    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId || !coursePrice) {
            return new NextResponse("WEBHOOK ERROR: Missing metada", {
                status: 400
            })
        }
        const existingPurchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })
        if (!existingPurchase) {
            try {
                await prisma.purchase.create({
                    data: {
                        userId,
                        courseId,
                        price: price,
                    },
                });
                console.log(`✅ Compra guardada: Usuario ${userId} - Curso ${courseId}`);
            } catch (error) {
                console.error("❌ Error guardando la compra en la base de datos:", error);
                return new NextResponse("Error saving purchase", { status: 500 });
            }


        } else {
            return new NextResponse(`WEBHOOK ERROR: Unhandled event type ${event.type}`, { status: 200 })
        }


    }
    return new NextResponse(null, { status: 200 })

}