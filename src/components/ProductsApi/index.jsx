import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
``;
const ProductsApi = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(category);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const jsonResponse = await response.json();
        setProducts(jsonResponse);
      } catch (error) {
        setError("Error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    category === "shop"
      ? products
      : products.filter(
          (product) =>
            product.category &&
            product.category.name.toLowerCase() === category.toLowerCase()
        );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-2 bg-red-300 grid grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="border-2 border-yellow-900 rounded-lg bg-blue-300 flex gap-10 flex-col items-center hover:cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <p className="text-lg font-bold">{product.title}</p>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-40 h-42 object-cover"
          />
          <p className="text-3xl font-bold">Rs {product.price}/- </p>
        </div>
      ))}
    </div>
  );
};

export default ProductsApi;
