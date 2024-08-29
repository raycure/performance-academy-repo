import React from "react";
import "./Footer.css";
import logo from "../../assets/LesmillsLogo.png";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { appear } from "../animations/AnimationValues";

function Footer() {
  const icons = [
    {
      href: "https://www.instagram.com/lesmills/",
      Icon: FaInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.youtube.com/user/lesmillsgroupfitness",
      Icon: FaYoutube,
      label: "YouTube",
    },
    {
      href: "https://www.tiktok.com/@lesmills",
      Icon: FaTiktok,
      label: "TikTok",
    },
    {
      href: "https://www.linkedin.com/company/les-mills-international/",
      Icon: FaLinkedinIn,
      label: "LinkedIn",
    },
    {
      href: "https://www.facebook.com/lesmills",
      Icon: FaFacebookF,
      label: "Facebook",
    },
    {
      href: "https://tr.pinterest.com/lesmills/",
      Icon: FaPinterestP,
      label: "Pinterest",
    },
  ];
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".addLineAnimation");

    animatedElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("lineAnimation");
        element.addEventListener("mouseleave", () => {
          element.classList.add("notHoveredLineAnimation");
        });
        element.classList.remove("notHoveredLineAnimation");
      });
    });
  });

  return (
    <div className="footer-outer-container">
      <div className="footer-social-container">
        <div className="footer-horizontal-line">
          <hr />
        </div>
        {icons.map((icon, index) => (
          <motion.div
            key={index}
            variants={appear}
            initial="hidden"
            whileInView="show"
            whileHover={{
              scale: 1.5,
            }}
            custom={index}
            className=""
          >
            <Link to={icon.href}>
              <icon.Icon className="icon" aria-label={icon.label} />
            </Link>
          </motion.div>
        ))}
        <div className="footer-horizontal-line">
          <hr />
        </div>
      </div>
      <div className="footer-container">
        <img src={logo} alt="lesmills logo" className="logo" />
        <p className="text-legal licence-text ">©licenced by my ass 🍑</p>
        <div className="footer-link-container">
          <HashLink
            to="/iletişim#contact-form-grad"
            className="addLineAnimation"
          >
            Bize Ulaşın
          </HashLink>
          <hr />
          <HashLink className="addLineAnimation" to="/iletişim#top">
            Sık Sorulan Sorular
          </HashLink>
          <hr />
          <HashLink
            className="addLineAnimation"
            to="/kişisel-verilerin-korunması#top"
          >
            Kişisel Verilerin Korunması
          </HashLink>
          <hr />
          <HashLink className="addLineAnimation" to="/çerezler#top">
            Çerezler
          </HashLink>
        </div>
      </div>
    </div>
  );
}
export default Footer;
