import { NavLink } from "react-router-dom";
import "./style.scss";

const Header = () => {
  return (
    <header id="header">
      <nav className="container header-container">
        <NavLink to="/">
          <div className="logo">
            <img src="/public/mylogo.jpg" alt="logo" />
            <p>CodeRare</p>
          </div>
        </NavLink>
        <div className="nav-right">
          <NavLink className="nav-btn" to="/login">Login</NavLink>
          <NavLink className="nav-btn" to="/register">Register</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
