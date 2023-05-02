
import { useState, useEffect } from "react";
import "./Dashboard.css"
import { GoogleLogout } from "react-google-login";
const clientId="1043906522623-joaeabjgseg9qodh0fuutqlv6jrm35bn.apps.googleusercontent.com"

function Dashboard() {
  const [products, setProducts] = useState(getProductsFromStorage());
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, imageUrl };
    if (editingIndex !== null) {
      const newProducts = [...products];
      newProducts[editingIndex] = newProduct;
      setProducts(newProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }
    setName("");
    setPrice("");
    setImageUrl("");
  };

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleEdit = (index) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setEditingIndex(index);
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function getProductsFromStorage() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return [];
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    window.location.href = "/login";
    return null;
  }
  const onSuccess=()=>{
    localStorage.removeItem("token")
    alert("User has been logged out successfully")
    window.location.href = "http://localhost:3001/login";
    console.log("LOGOUT SUCCESSULLY")
  }
  return (
    
    <div>
        <div id="signOutButton">

         <GoogleLogout clientId={clientId} buttonText="LOGOUT" onLogoutSuccess={onSuccess} id="signOutButton"/>
        </div>
      <h1>Add a Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        </label>
        <br />
        <button type="submit">{editingIndex !== null ? "Save" : "Add Product"}</button>
        {editingIndex !== null && (
          <button type="button" onClick={() => setEditingIndex(null)}>
            Cancel
          </button>
        )}
      </form>
      {/* <button onClick={handleLogout}>Logout</button> */}
     
      <h1>Products section</h1>
      <input style={{ width: "300px" }}
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        <div id="container">
          {filteredProducts.map((product, index) => (
            <li key={index}>
              {product.imageUrl && (
                <img src={product.imageUrl} alt="Product" width="400" height="400" />
              )}
              <br />
              {editingIndex === index ? (
                <input type="text" value={name} onChange={handleNameChange} />
              ) : (
                <span>Name: <b>{product.name} </b></span>
              )}
              <br />
              {editingIndex === index ? (
                <input type="text" value={price} onChange={handlePriceChange} />
                ) : (
                <span>Price: <b>{product.price}  </b></span>
                )}
                <br />
                <br />
                <button type="button" onClick={() => handleDelete(index)} style={{marginRight:"100px"}}>
                Delete
                </button>
                {editingIndex === index ? (
                <button type="button" onClick={() => setEditingIndex(null)}>
                Cancel
                </button>
                ) : (
                <button type="button" onClick={() => handleEdit(index)}>
                Edit
                </button>
                )}
                </li>
                ))}
                </div>
                </ul>
                
                </div>
                );
                }
                
                export default Dashboard;