"use client";
import { getCartProducts, getProducts } from "@/lib/api";
import { addToCart } from "@/lib/mutation";
import { ProductsType } from "@/types/dashboard.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";

interface ProductCardProps {
  product: ProductsType;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const mutation = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addToCart,
  });

  const query = useQuery({
    queryKey: ["get-cart-products"],
    queryFn: async () => {
      const response = await getCartProducts();
      return response.data;
    },
  });

  console.log("data", query.data);

  const handleAddToCart = async () => {
    try {
      await mutation.mutateAsync({
        productId: product.id.toString(),
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        className="h-48 w-full object-cover object-center"
        src={product.image}
        alt="Product Image"
        width={400}
        height={400}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Product Name</div>

        <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis line-clamp-3">
          {product.description}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.price}
        </span>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const HomeContainer = () => {
  const { data, isLoading } = useQuery<ProductsType[]>({
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
