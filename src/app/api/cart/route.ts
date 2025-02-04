
import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';
import { readProducts } from '../products/route';

const cartFilePath = path.join(process.cwd(), 'cart.json');

export const readCart = (): { productId: number; quantity: number }[] => {
    try {
        const data = fs.readFileSync(cartFilePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

export const writeCart = (cart: { productId: number; quantity: number }[]) => {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2), 'utf-8');
};

export async function GET() {
    try {
        const cart = readCart();
        const products = readProducts();
        const cartProducts = cart.map(item => {
            const product = products.find(product => product.id === item.productId);
            return {
                ...product,
                quantity: item.quantity
            };
        });
        return NextResponse.json({ message: "Fetch all cart products", data: cartProducts });
    } catch {
        return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { productId, quantity, action } = await request.json();

        if (!productId || quantity < 0) {
            return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
        }

        const cart = readCart();
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            // Product already in cart, update quantity based on action
            if (action === "increase") {
                cart[existingItemIndex].quantity += 1;
            } else if (action === "decrease") {
                cart[existingItemIndex].quantity = Math.max(1, cart[existingItemIndex].quantity - 1);
            } else if (action === "set") {
                if (quantity > 0) {
                    cart[existingItemIndex].quantity = quantity;
                } else {
                    cart.splice(existingItemIndex, 1); // Remove item if quantity is 0
                }
            } else if (action === "delete") {
                cart.splice(existingItemIndex, 1); // Remove product from cart
            }
        } else {
            // Product not in cart, just add it
            if (action === "increase") {
                cart.push({
                    productId,
                    quantity: 1,
                });
            }
        }

        writeCart(cart);

        return NextResponse.json({ message: "Cart updated", data: cart });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}