import { NextResponse } from 'next/server';

const baseURL = "https://fakestoreapi.com";


export async function GET() {
    try {
        const res = await fetch(`${baseURL}/products`);
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await res.json();

        return NextResponse.json({
            message: "Fetch products successfully",
            data: products
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch products",
            error: (error as Error).message
        }, { status: 500 });
    }
}
