import Header from './header.jsx'
import { useRef,useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import gsap from 'gsap'

export default function LoginPage(){

  useEffect(() => {
  const tl = gsap.timeline({ repeat: -1 });

  const pulse = {
    scale: 1.3,
    duration: 0.7,
    ease: "power1.inOut",
    yoyo: true,
    repeat: 1
  };

  tl.to(".triangle1", pulse)
    .to(".triangle2", pulse)
    .to(".triangle3", pulse)
    .to(".triangle4", pulse);

}, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = () => {
  if (username === "admin" && password === "admin") {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home"); 
  } else {
    alert("Invalid Username or Password");
  }
};

  
    return(
        <>
        <Header />
        <div className="loginpage">
        <div className="logincontainer">
          <img src="image.png" alt="welcome image"  className="welcome"/>
        </div>
        <div className="logincontainer2">

          <div className="layer">
              <div className="triangle4"></div>

              
              <div className="ringFront"></div>
              
            </div>

            <div className="layer">
              <div className="triangle3"></div>

              
              <div className="ringFront"></div>
            </div>

            <div className="layer">
              <div className="triangle2"></div>

              
              <div className="ringFront"></div>
            </div>

            <div className="layer">
              <div className="triangle1"></div>

              
              <div className="ringFront"></div>
          </div>

        </div>


        <div className="logincontainer">
          <h1 className="text">Leading IT Product Distributors</h1>
          <div className="form">
            <h1 className="textlog">Login</h1>
            <input type="text" placeholder="Username" className="inputlog" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" className="inputlog" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            
            <button className="btnlog" onClick={handleLogin}>Click to join us --&gt;</button>
          </div>
        </div>

      </div>
      </>
    )


}