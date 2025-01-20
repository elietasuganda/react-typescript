import React, { useEffect, useState } from "react";

// Type data definitation untuk produk
interface Category {
  id: number;
  name: string;
  image: string;
}

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[]; // Array gambar produk
}

const Products: React.FC = () => {
  // State untuk menyimpan data API
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: Products[] = await response.json();
      console.log(data);

      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-purple-900">
      <h1>ShopSmart</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> - {product.description}
            <p>Price: ${product.price}</p>

            {/* Menampilkan gambar kategori */}
            <div>
              <h3>Category: {product.category.name}</h3>
              <img
                src={product.category.image}
                alt={product.category.name}
                width={150}
                height={150}
              />
            </div>

            {/* Menampilkan gambar produk (gambar pertama dari array 'images') */}
            <div>
              <h4>Product Images</h4>
              <img
                src={product.images[1]} // Gambar pertama dari array 'images'
                alt={product.title}
                width={200}
                height={200}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;