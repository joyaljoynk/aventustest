
import './App.css'
import {Navigate,Routes,Route} from 'react-router-dom';
import LoginPage from './pages/loginpage.jsx'
import Home from './pages/home.jsx'
import Add from './pages/add.jsx'
import ProductDetails from './pages/productdetails.jsx'
import EditPage from './pages/edit.jsx'

export  function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>}/>
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <Add/>
          </PrivateRoute>}/>
       <Route 
       path="/product/:id" element={
        <PrivateRoute>
       <ProductDetails />
       </PrivateRoute>} />

       <Route path="/edit/:id" element={
        <PrivateRoute>
       <EditPage />
       </PrivateRoute>} />

    </Routes>
   

    </>
  )
}

export default App
