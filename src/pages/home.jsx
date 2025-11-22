import Header from '../pages/header.jsx';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
   useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const apiProducts = await res.json();
        const localProducts = JSON.parse(localStorage.getItem("myProducts")) || [];
        const combined = [...apiProducts, ...localProducts];

        setProducts(combined);

      } catch (err) {
        setError("Failed to load products");
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

   const categoriesOrder = [
    "electronics",
    "men's clothing",
    "women's clothing",
    "jewelery",
  ];

  const grouped = categoriesOrder.reduce((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat);
    return acc;
  }, {});

  return (
    <>
    <Header />  
    <div className="home-container">
      

      <div className="actions">
        <h1 className="title">Products</h1>
        
          <button className="button">
            <Link to="/add"  className='link'>Add Product</Link>
            </button>
        
      </div>

      <div className="product-grid">
         {categoriesOrder.map((cat) => {
          const items = grouped[cat] || [];
          if (!items.length) return null;
          return (
            <section key={cat} className="category-section">
              <h2 className="category-title">{cat}</h2>
              <div className="slider-container">

                  <button
                    className="arrow left"
                    onClick={() =>
                      document.getElementById(`row-${cat}`).scrollBy({ left: -300, behavior: "smooth" })
                    } > ❮  </button>


                  <div className="product-row" id={`row-${cat}`}>
                    {items.map((product) => (
                      <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3 className="product-title">{product.title}</h3>
                        <button className="product-price">₹{product.price}</button>
                      </div>
                    ))}
                  </div>

                  <button
                    className="arrow right"
                   onClick={() =>
                    document.getElementById(`row-${cat}`).scrollBy({ left: 300, behavior: "smooth" })}>  ❯ </button>
                   
                  

                </div>

            </section>
          );
        })}
        
      </div>
    </div>
    </>
  );
}
