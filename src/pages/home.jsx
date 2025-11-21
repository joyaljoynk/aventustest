import Header from '../pages/header.jsx';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <>
    <Header />  
    <div className="home-container">
      <h1 className="title">Products</h1>

      <div className="actions">
        <Link to="/add" className="btn-add">
          ➕ Add Product
        </Link>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}  className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
             <button className="product-price">₹{product.price}</button>
          </div>
          
        ))}
        
      </div>
    </div>
    </>
  );
}
