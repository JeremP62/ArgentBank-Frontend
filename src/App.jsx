import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<div>User</div>} />
      </Routes>
      <footer className='footer'>
        <p>Copyright 2020 Argent Bank</p>
      </footer>
    </Router>
  )
}

export default App;