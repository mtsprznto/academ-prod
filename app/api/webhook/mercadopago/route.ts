import { NextResponse } from "next/server";


export async function POST(req: Request) {
    console.log("Webhook recibido");
    const body = await req.json();
    console.log("Body recibido:", body);
    return new NextResponse("Webhook recibido", { status: 200 });
}