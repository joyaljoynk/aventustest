
import './App.css'
import {Navigate,Routes,Route} from 'react-router-dom';
import LoginPage from './pages/loginpage.jsx'
import Home from './pages/home.jsx'
import Add from './pages/add.jsx'

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
    </Routes>
    </>
  )
}

export default App
