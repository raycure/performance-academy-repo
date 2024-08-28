import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom"; //u cant style the links directly
import { FaUser } from "react-icons/fa6";
import Button from "../Button/Button";
import logo from "../../assets/LesmillsLogo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GrLanguage } from "react-icons/gr";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navigation-outer-container">
      <nav className="nav-container nav-inner-container">
        <Link aria-label="logo" style={{ display: "contents" }}>
          <img alt="beep" className="logo" src={logo}></img>
        </Link>
        <ul className="nav-list-container nav-container text-accent-400">
          <li>
            <NavLink to="/">Ana Sayfa</NavLink>
          </li>
          <li>
            <NavLink to="/programlar">Kurslar</NavLink>
          </li>
          <li>
            <NavLink to="/etkinlikler">Etkinlikler</NavLink>
          </li>
          <li>
            <NavLink to="/kurslarım">Kurslarım</NavLink>
          </li>
          <li>
            <NavLink to="/iletişim">İletişim</NavLink>
          </li>
        </ul>
        <div className="nav-btn-container nav-container">
          <Link aria-label="language" style={{ display: "contents" }}>
            <GrLanguage className="nav-item-icon" />
          </Link>
          <Link aria-label="user" style={{ display: "contents" }}>
            <FaUser className="nav-item-icon" />
          </Link>
          <Button redirect={"/register"}>Kaydol</Button>
        </div>
        <div className="menu nav-container">
          <Link aria-label="language" style={{ display: "contents" }}>
            <GrLanguage className="nav-item-icon" />
          </Link>
          <Link aria-label="user" style={{ display: "contents" }}>
            <FaUser className="nav-item-icon" />
          </Link>
          <HiOutlineMenuAlt3
            className="nav-item-icon"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>
      </nav>
      <ul
        className={`text-accent-400 menu ${
          menuOpen ? "menu-open" : "menu-close"
        }`}
      >
        <li>
          <NavLink to="/">Ana Sayfa</NavLink>
        </li>
        <li>
          <NavLink to="/programlar">Kurslar</NavLink>
        </li>
        <li>
          <NavLink to="/duyurular">Duyurular</NavLink>
        </li>
        <li>
          <NavLink to="/kurslarım">Kurslarım</NavLink>
        </li>
        <li>
          <NavLink to="/iletişim">İletişim</NavLink>
        </li>
        <Button redirect={"/register"}>Kaydol</Button>
      </ul>
    </div>
  );
}
export default Navbar;
// import React, { useState, useEffect } from 'react';

// const Navbar = () => {
//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const controlNavbar = () => {
//     if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
//       setShow(false);
//     } else { // if scroll up show the navbar
//       setShow(true);
//     }

//     // remember current page location to use in the next move
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', controlNavbar);

//     // cleanup function
//     return () => {
//        window.removeEventListener('scroll', controlNavbar);
//     };
//   }, [lastScrollY]);
