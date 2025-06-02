import { getRevenueByMonth } from "@/actions/getRevenueByMonth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getRevenueByMonth();
        return NextResponse.json(data);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}