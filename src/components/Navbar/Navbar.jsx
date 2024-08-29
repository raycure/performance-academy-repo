import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom'; //u cant style the links directly
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/LesmillsLogo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { GrLanguage } from 'react-icons/gr';
import { FiX } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaPinterestP } from 'react-icons/fa6';
function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleNavMenu = () => {
		setMenuOpen(false);
		document.body.style.overflowY = 'unset';
	}; // menu kapanınca scrollu aktiflestiriyor ama xde tasma oldugu icin y actı sadece

	const icons = [
		{
			href: 'https://www.instagram.com/lesmills/',
			Icon: FaInstagram,
			label: 'Instagram',
		},
		{
			href: 'https://www.youtube.com/user/lesmillsgroupfitness',
			Icon: FaYoutube,
			label: 'YouTube',
		},
		{
			href: 'https://www.tiktok.com/@lesmills',
			Icon: FaTiktok,
			label: 'TikTok',
		},
		{
			href: 'https://www.linkedin.com/company/les-mills-international/',
			Icon: FaLinkedinIn,
			label: 'LinkedIn',
		},
		{
			href: 'https://www.facebook.com/lesmills',
			Icon: FaFacebookF,
			label: 'Facebook',
		},
		{
			href: 'https://tr.pinterest.com/lesmills/',
			Icon: FaPinterestP,
			label: 'Pinterest',
		},
	];
	return (
		<div className='navigation-outer-container'>
			<nav
				className={`nav-container nav-inner-container ${
					menuOpen ? 'display-hidden' : ''
				}`}
			>
				<Link to='/' aria-label='logo' style={{ display: 'contents' }}>
					<img alt='beep' className='logo' src={logo}></img>
				</Link>
				<ul className='nav-list-container nav-container text-accent-400'>
					<li>
						<NavLink to='/'>Ana Sayfa</NavLink>
					</li>
					<li>
						<NavLink to='/programlar'>Kurslar</NavLink>
					</li>
					<li>
						<NavLink to='/etkinlikler'>Etkinlikler</NavLink>
					</li>
					<li>
						<NavLink to='/kurslarım'>Kurslarım</NavLink>
					</li>
					<li>
						<NavLink to='/iletişim'>İletişim</NavLink>
					</li>
				</ul>
				<div className='nav-btn-container nav-container'>
					<Link aria-label='language' style={{ display: 'contents' }}>
						<GrLanguage className='nav-item-icon' />
					</Link>
					<Link aria-label='user' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link>
					<Button redirect={'/register'}>Kaydol</Button>
				</div>
				<div className='menu nav-container'>
					<Link aria-label='language' style={{ display: 'contents' }}>
						<GrLanguage className='nav-item-icon' />
					</Link>
					<Link aria-label='user' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link>
					<HiOutlineMenuAlt3
						className='nav-item-icon'
						onClick={() => {
							setMenuOpen(!menuOpen);
							if (
								typeof window != 'undefined' &&
								window.document
							) {
								document.body.style.overflow = 'hidden';
							}
						}} //menu acıp scroll kapatıyor
					/>
				</div>
			</nav>
			<ul
				className={`text-accent-400 bg-primary-400 box-shadow ${
					menuOpen ? 'menu-open' : 'display-hidden'
				}`}
			>
				<FiX className='navbar-xmark' onClick={toggleNavMenu} />
				<div className='menu-inner-container'>
					<hr />
					<li>
						<NavLink onClick={toggleNavMenu} to='/'>
							Ana Sayfa
						</NavLink>
					</li>
					<hr className='light-line' />
					<li>
						<NavLink onClick={toggleNavMenu} to='/programlar'>
							Kurslar
						</NavLink>
					</li>
					<hr className='light-line' />
					<li>
						<NavLink onClick={toggleNavMenu} to='/etkinlikler'>
							Etkinlikler
						</NavLink>
					</li>
					<hr className='light-line' />
					<li>
						<NavLink onClick={toggleNavMenu} to='/kurslarım'>
							Kurslarım
						</NavLink>
					</li>
					<hr className='light-line' />
					<li>
						<NavLink onClick={toggleNavMenu} to='/iletişim'>
							İletişim
						</NavLink>
					</li>
					<hr />
				</div>
				<div className='footer-social-container nav-menu-social-container'>
					{icons.map((icon, index) => (
						<Link
							key={index}
							className='icon-light-container'
							to={icon.href}
						>
							<icon.Icon
								className='icon'
								aria-label={icon.label}
							/>
						</Link>
					))}
				</div>
				<Button onClick={toggleNavMenu} redirect={'/register'}>
					Kaydol
				</Button>
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
