import "./Navbar.css";
import { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import { logo } from "../assets";
import mainlogo from "../assets/mainlogo.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar-container">
      <nav>
        <div className="logo-container">
          <img src={mainlogo} height="35px" width="100px" alt="SumA.ILogo" />
        </div>
        <div className="links-container">
          <a href="#about" className="link">
            About Sum A.I
          </a>
          <a href="#whysumai" className="link">
            Why Sum A.I ?
          </a>
          <a href="#usesumai" className="link">
            Use Sum A.I
          </a>
        </div>
        <div className="ham-container">
          <Hamburger
            className="ham-icon"
            easing="ease-in"
            onToggle={handleMenuToggle}
            toggled={menuOpen}
          />
        </div>
      </nav>
      {menuOpen && (
        <nav className="dropdwn-container">
          <div className="drpdwn-links-container">
            <a href="#about" className="drpdwn-link">
              About Sum A.I
            </a>
            <a href="#whysumai" className="drpdwn-link">
              Why Sum A.I ?
            </a>
            <a href="#usesumai" className="drpdwn-link">
              Use Sum A.I
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
export default Navbar;
