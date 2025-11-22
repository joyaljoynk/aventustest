import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const local = JSON.parse(localStorage.getItem("myProducts")) || [];
      const localMatch = local.find((p) => String(p.id) === String(id));
      if (localMatch) {
        setProduct(localMatch);
        setLoading(false);
        return;
      }
      try {
        const apiRes = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!apiRes.ok) {
          setProduct(null);
          setLoading(false);
          return;
        }
        const data = await apiRes.json();
        if (!data || Object.keys(data).length === 0) {
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const local = JSON.parse(localStorage.getItem("myProducts")) || [];
    const isLocalProduct = local.some((p) => String(p.id) === String(id));

    if (isLocalProduct) {
      const updated = local.filter((p) => String(p.id) !== String(id));
      localStorage.setItem("myProducts", JSON.stringify(updated));
      alert("Product deleted successfully!");
      navigate("/home");
      return;
    }
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
      alert("API product deleted (simulation only). It will reappear after refresh.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
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
            <button onClick={() => navigate(`/home`)} className="button back-btn">
              Back
            </button>

            <button onClick={() => navigate(`/edit/${product.id}`)} className="button edit-btn">
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

