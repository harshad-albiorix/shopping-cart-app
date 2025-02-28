"use client";
import { useCart } from "@/hooks/useCart";
import { CartProductsType } from "@/types/dashboard.type";
import Image from "next/image";

const CartProducts = ({ product }: { product: CartProductsType }) => {
  const { handleIncrement, handleDecrement, handleRemoveFromCart } = useCart();

  return (
    <div
      key={product.productId?._id}
      className="flex items-center justify-between border-b py-4"
    >
      <div className="flex items-center">
        <Image
          height={500}
          width={500}
          src={product.productId?.image}
          alt={product.productId?.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{product?.productId?.title}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-lg transition duration-300"
            onClick={() => handleDecrement(product)}
          >
            -
          </button>
          <span className="px-4 py-1 text-lg font-semibold border-l border-r border-gray-300">
            {product.quantity}
          </span>
          <button
            className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-lg transition duration-300"
            onClick={() => handleIncrement(product)}
          >
            +
          </button>
        </div>
        <p className="text-lg font-semibold">
          ${(product.price * product.quantity).toFixed(2)}
        </p>
        <button
          className="text-red-500"
          onClick={() => handleRemoveFromCart(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-2 14H7L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export const CartContainer = () => {
  const { cartProducts, totalPrice } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartProducts?.map((item, i) => (
            <CartProducts key={i} product={item} />
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$2.99</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${((totalPrice ?? 0) + 5 + 2.99).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
