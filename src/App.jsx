import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setCredentials } from './features/authSlice';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './components/User';
import AccountTransactions from "./components/AccountTransactions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          // On remplit le store Redux avec les données de l'API
          dispatch(setCredentials(data.body)); 
        }
      })
      .catch((error) => console.error("Erreur refresh:", error));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<User />} />
        <Route path="/account/:id" element={<AccountTransactions />} />
      </Routes>
      <footer className='footer'>
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </Router>
  );
}

export default App;