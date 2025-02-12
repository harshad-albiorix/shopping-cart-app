import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();
    const cookieStore = await cookies();
    cookieStore.set("token", token, { secure: true });
    return new Response("Cookies set successfully", { status: 200 });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return new Response("Cookies deleted successfully", { status: 200 });
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    return NextResponse.json(
        { token: token?.value },
        { status: 200 }
    );
}
