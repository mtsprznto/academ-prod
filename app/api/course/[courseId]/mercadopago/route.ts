import { mercadopago } from "@/lib/mercadopago";
import { Preference } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, price } = body;

  try {


    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id: "message",
            unit_price: price,
            quantity: 1,
            title: "Mensaje de local"
          }
        ],
        metadata: {
          title
        },
      }
    })
    return NextResponse.json({ url: preference.init_point });

  } catch (error) {
    console.error("Error creating preference:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}