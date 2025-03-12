import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ addtoCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const jsonResponse = await response.json();
        setProduct(jsonResponse);
      } catch (err) {
        setError("Error occurred while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <div className="flex gap-5">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-80 h-80 object-cover my-4"
        />
        <img
          src={product.images[1]}
          alt={product.title}
          className="w-80 h-80 object-cover my-4"
        />
        <img
          src={product.images[2]}
          alt={product.title}
          className="w-80 h-50 object-cover my-4"
        />
      </div>
      <div className="mt-3 space-y-10">
        <p className="text-md mt-4">{product.description}</p>
        <p className="text-xl font-semibold">Price: Rs {product.price}/-</p>
        <div className="flex gap-2 text-md">
          <p>Purchase quantity</p>
          <div className="border-2 rounded-lg border-black flex gap-5 p-1">
            <button onClick={decrementCount}>-</button>
            <p>{count}</p>
            <button onClick={incrementCount}>+</button>
          </div>
        </div>
        <p className="text-sm">Total Price: Rs {product.price * count}/-</p>
      </div>
      <button
        className="text-xl border-2 border-green-600 rounded-full p-2 bg-yellow-100 hover:bg-yellow-300 transition-transform"
        onClick={() => addtoCart(product, count)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
