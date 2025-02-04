"use client";
import { useCart } from "@/hooks/useCart";
import { getCartProducts, getProducts } from "@/lib/api";
import { ProductsType } from "@/types/dashboard.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";

interface ProductCardProps {
  product: ProductsType;
}

interface FetchCartProductsType extends ProductsType {
  quantity: number;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart } = useCart();

  const products = useQuery<FetchCartProductsType[]>({
    queryKey: ["get-cart-products"],
    queryFn: async () => {
      const response = await getCartProducts();
      return response.data;
    },
  });

  const productInCart = products.data?.find((item) => item.id === product.id);

  return (
    <div className="relative container mx-auto max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {(productInCart?.quantity ?? 0) > 0 && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          Added ({productInCart?.quantity})
        </div>
      )}
      <Image
        className="h-48 w-full object-cover object-center"
        src={product.image}
        alt="Product Image"
        width={400}
        height={400}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 line-clamp-1">
          {product.title}
        </div>

        <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis line-clamp-3">
          {product.description}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${product.price}
        </span>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAddToCart(product)}
        >
          {!!productInCart?.quantity ? "Add More" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export const HomeContainer = () => {
  const { data } = useQuery<ProductsType[]>({
    queryKey: ["get-products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
