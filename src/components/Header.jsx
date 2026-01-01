import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import logo from '../assets/img/argentBankLogo.png';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // On récupère le token et les infos user depuis le store
  const { user } = useSelector((state) => state.auth);

  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()); // On supprime le token dans Redux
    navigate("/");      // On redirige vers l'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          /* SI LE TOKEN EXISTE : On affiche le profil et le bouton Sign Out */
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.userName || user?.firstName || "User"} 
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          /* SI PAS DE TOKEN : On affiche le bouton Sign In habituel */
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;