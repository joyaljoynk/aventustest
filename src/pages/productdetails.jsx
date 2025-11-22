import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await api.json();
        
        const local = JSON.parse(localStorage.getItem("myProducts")) || [];
        const localMatch = local.find(p => p.id == id);
        
        setProduct(localMatch || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const local = JSON.parse(localStorage.getItem("myProducts")) || [];
    const isLocalProduct = local.some(p => p.id == id);

    if (isLocalProduct) {
      const updated = local.filter(p => p.id != id);
      localStorage.setItem("myProducts", JSON.stringify(updated));

      alert("Product deleted successfully!");
      navigate("/home");
      return;
    }
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(json => console.log("Fake delete response:", json));

    alert("API product deleted (simulation only). It will reappear after refresh.");
    navigate("/home");
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", color: "white", marginTop: "50px" }}>
        Loading...
      </h2>
    );

  if (!product)
    return <h2 style={{ textAlign: "center", color: "white" }}>Product not found</h2>;

  return (
    <div className="container product-details-page">
      <div className="detail-wrapper">
        <div className="image-section">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="info-section">
          <h1 className="detail-title">{product.title}</h1>
          <h3 className="detail-category">{product.category}</h3>
          <h2 className="detail-price">₹{product.price}</h2>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-actions">
            <button onClick={() => navigate(-1)} className="button back-btn">
              Back
            </button>

            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="button edit-btn"
            >
              Edit
            </button>

            <button onClick={handleDelete} className="button delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
