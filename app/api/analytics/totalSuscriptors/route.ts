import { NextResponse } from "next/server";

import { getSuscriptorsByMonth } from "@/actions/getSuscribersByMonth";

export async function GET() {
    try {
        const data = await getSuscriptorsByMonth()
        return NextResponse.json(data);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })

    }
}