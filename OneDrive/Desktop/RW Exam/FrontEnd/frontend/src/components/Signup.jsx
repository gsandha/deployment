import { useState } from "react"
import "./signup.css"
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      department: department,
    };
    // connecting FE with BE
    fetch("https://pink-hilarious-blackbuck.cyclic.app/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res) )
      .catch((err) => console.log(err));
      alert("User Registered Successfully")
  };

  return (
    <>
      <h1>Registration Page</h1>
      <div className="form-container">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export { Signup };
