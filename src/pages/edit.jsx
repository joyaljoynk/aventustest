import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./header.jsx";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const api = await fetch(`https://fakestoreapi.com/products/${id}`);
        const apiData = await api.json();

        const local = JSON.parse(localStorage.getItem("myProducts")) || [];
        const localMatch = local.find(p => p.id == id);

        const productData = localMatch || apiData;
        setProduct(productData);
        setTitle(productData.title);
        setPrice(productData.price);
        setDescription(productData.description);
        setCategory(productData.category);
        setImage(productData.image);
        setPreview(productData.image);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  
  const validate = () => {
    let err = {};
    if (!title.trim()) err.title = "Title is required";
    if (!price || isNaN(price)) err.price = "Valid price required";
    if (!description.trim()) err.description = "Description required";
    if (!category.trim()) err.category = "Category is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    const updatedProduct = {
      ...product,
      title,
      price: Number(price),
      description,
      category,
      image
    };

    
    const local = JSON.parse(localStorage.getItem("myProducts")) || [];
    const exists = local.some(p => p.id == id);

    if (exists) {
      const newList = local.map(p => (p.id == id ? updatedProduct : p));
      localStorage.setItem("myProducts", JSON.stringify(newList));
    } else {
      console.log("API Products cannot be edited (Fake Update Only)");
    }

    alert("Product updated successfully!");
    navigate(`/product/${id}`);
  };

  if (loading) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  if (!product) return <h2 style={{ color: "white", textAlign: "center" }}>Product not found</h2>;

  return (
    <>
      <Header />
      <div className="add-container">
        <h1>Edit Product</h1>

        <form className="add-form" onSubmit={handleSave}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <p className="error">{errors.title}</p>}

          <label>Price</label>
          <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
          {errors.price && <p className="error">{errors.price}</p>}

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <p className="error">{errors.description}</p>}

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}

          <label>Replace Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {preview && (
            <div className="preview-box">
              <img src={preview} width="150" />
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="button" onClick={() => navigate(-1)}>
              Cancel
            </button>

            <button type="submit" disabled={saving} className="button">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
