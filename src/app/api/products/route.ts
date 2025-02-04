import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ProductsType } from '@/types/dashboard.type';

const productsFilePath = path.join(process.cwd(), 'products.json');



export const readProducts = (): ProductsType[] => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};


export async function GET() {
    try {
        const products = readProducts();
        return NextResponse.json({ message: "Fetch all products", data: products });
    } catch {
        return NextResponse.json({ error: 'Failed to get products' }, { status: 500 });
    }
}


// export async function GET() {
//     try {
//         const res = await fetch(`${baseURL}/products`);
//         if (!res.ok) {
//             throw new Error("Failed to fetch products");
//         }
//         const products = await res.json();

//         return NextResponse.json({
//             message: "Fetch products successfully",
//             data: products
//         }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({
//             message: "Failed to fetch products",
//             error: (error as Error).message
//         }, { status: 500 });
//     }
// }
