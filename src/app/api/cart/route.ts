
import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

const cartFilePath = path.join(process.cwd(), 'cart.json');

export const readCart = (): { productId: string; quantity: number }[] => {
    try {
        const data = fs.readFileSync(cartFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

export const writeCart = (cart: { productId: string; quantity: number }[]) => {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2), 'utf-8');
};

export async function GET() {
    try {
        const cart = readCart();
        return NextResponse.json({ message: "Fetch all cart products", data: cart });
    } catch {
        return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { productId, quantity } = await request.json();
        if (!productId || !quantity || quantity <= 0) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }
        const cart = readCart();
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }

        writeCart(cart);

        return NextResponse.json({ message: "Add product into cart", data: cart });
    } catch {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
