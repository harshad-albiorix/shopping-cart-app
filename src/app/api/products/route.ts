import { NextResponse } from 'next/server';

import path from 'path';
import { ProductsType } from '@/types/dashboard.type';
import { readJsonFile } from '@/utils/readJsonFile';

const productsFilePath = path.join(process.cwd(), 'products.json');

const readProducts = (): ProductsType[] => readJsonFile<ProductsType>(productsFilePath);

export async function GET() {
    try {
        const products = readProducts();
        return NextResponse.json({ message: "Fetch all products", data: products });
    } catch {
        return NextResponse.json({ error: 'Failed to get products' }, { status: 500 });
    }
}