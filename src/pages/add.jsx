import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.jsx";
export default function AddPage() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Title required";
    if (!price || isNaN(price)) newErrors.price = "Valid price required";
    if (!description.trim()) newErrors.description = "Description required";
    if (!category.trim()) newErrors.category = "Category required";
    if (!image.trim()) newErrors.image = "Image required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      description,
      category,
      image
    };

    try {
      await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json"
        }
      });

      
      const existing = JSON.parse(localStorage.getItem("myProducts")) || [];
      localStorage.setItem("myProducts", JSON.stringify([...existing, newProduct]));

      alert("Product Added Successfully!");
      navigate("/home");

    } catch (err) {
      alert("Failed to add product");
    }

    setLoading(false);
  };

  return (
    <>
    <Header />
    <div className="add-container">

      <h1>Add New Product</h1>

      <form className="add-form" onSubmit={handleSubmit}>

        <label>Title</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Price</label>
        <input 
          type="number" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>Description</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Category</label>
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
        </select>

        {errors.category && <p className="error">{errors.category}</p>}


        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        
        {errors.image && <p className="error">{errors.image}</p>}

        {preview && (
          <div className="preview-box">
            <img src={preview} width="150" />
          </div>
        )}
        <div className="form-actions">
        <button type="button" className="button" onClick={() => navigate("/home")}>
          Cancel
        </button>
            <button type="submit" disabled={loading} className="button">
          {loading ? "Adding..." : "Add Product"}
        </button>
        </div>
        


      </form>
    </div>
    </>
  );
}
