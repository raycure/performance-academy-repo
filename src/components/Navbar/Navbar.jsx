import React, { useState, useEffect, useLayoutEffect } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom'; //u cant style the links directly
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/PFALogo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { GrLanguage } from 'react-icons/gr';
import { FiX } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaPinterestP } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import {
	rightToLeft,
	socialSlide,
	backgroundFill,
} from '../animations/AnimationValues';
import instagramBackground from '../../assets/instagram-background.jpg';
import { useTranslation } from 'react-i18next';

function Navbar() {
	//if the user is logged in it hides the register button
	const [isLoggedin, setIsLoggedin] = useState(false);
	useLayoutEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		setIsLoggedin(isLoggedIn);
	}, []);

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
			backgroundImage: instagramBackground,
		},
		{
			href: 'https://www.youtube.com/user/lesmillsgroupfitness',
			Icon: FaYoutube,
			label: 'YouTube',
			backgroundColor: '#ff0808',
		},

		{
			href: 'https://www.linkedin.com/company/les-mills-international/',
			Icon: FaLinkedinIn,
			label: 'LinkedIn',
			backgroundColor: '#0a78b5',
		},
		{
			href: 'https://www.tiktok.com/@lesmills',
			Icon: FaTiktok,
			label: 'TikTok',
			backgroundColor: '#fc3359',
		},
		{
			href: 'https://www.facebook.com/lesmills',
			Icon: FaFacebookF,
			label: 'Facebook',
			backgroundColor: '#106bff',
		},
		{
			href: 'https://tr.pinterest.com/lesmills/',
			Icon: FaPinterestP,
			label: 'Pinterest',
			backgroundColor: '#e60023',
		},
	];
	const { t, i18n } = useTranslation('translation');
	const paths = [
		{
			path: '/',
			label: t('Navbar.Main'),
		},
		{
			path: '/programlar',
			label: t('Navbar.Programs'),
		},
		{
			path: '/etkinlikler',
			label: t('Navbar.Events'),
		},
		{
			path: '/programlarım',
			label: t('Navbar.MyPrograms'),
		},
		{
			path: '/iletişim',
			label: t('Navbar.Contact'),
		},
	];

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	const handleLanguageChange = (lng) => {
		changeLanguage(lng);
	};
	const [windowWidth, setWindowWidth] = useState(0);
	let resizeWindow = () => {
		setWindowWidth(window.innerWidth);
	};
	useEffect(() => {
		resizeWindow();
		window.addEventListener('resize', resizeWindow);
		return () => window.removeEventListener('resize', resizeWindow);
	}, []);
	const handleClickOutside = (event) => {
		const path = event.composedPath ? event.composedPath() : [];
		if (
			!path.some((el) => el.id === 'menu-navigation' || el.id === 'menu-button')
		) {
			setMenuOpen(false);
			document.body.style.overflowY = 'unset';
		}
	};
	useEffect(() => {
		if (menuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuOpen]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='navigation-outer-container user-select-none' id='navbar'>
			<nav className='nav-container nav-inner-container'>
				<Link to='/' aria-label='logo' style={{ display: 'contents' }}>
					<img alt='LessMills logo' className='pfa-logo' src={logo}></img>
				</Link>
				<ul className='nav-list-container nav-container text-accent-400'>
					{paths.map((path, index) => {
						return (
							<li className='nav-list-item relative-position' key={index}>
								<NavLink to={path.path}>{path.label}</NavLink>
							</li>
						);
					})}
				</ul>
				<div className='nav-btn-container nav-container'>
					<Link
						onClick={() => {
							if (i18n.language === 'en') {
								changeLanguage('tr');
								return;
							}
							changeLanguage('en');
						}}
						aria-label='language'
						style={{ display: 'contents' }}
					>
						<GrLanguage className='nav-item-icon' />
						{i18n.language === 'en' ? 'EN' : 'TR'}
					</Link>
					{/* <Link aria-label='user' to='/login' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link> */}

					{/* <Button onClick={handleDropDownMenu}>
						<FaUser className='nav-item-icon' />
					</Button>
					<motion.div className='drop-down-menu'></motion.div> */}

					<div className='dropdown'>
						<FaUser className='nav-item-icon' onClick={toggleDropdown} />
						<div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
							<h4 id='test'>signout</h4>
							<h4 id='test'>user info</h4>
						</div>
					</div>

					<Button //todo custom event kullanarak refresh gerektirmeden gizle
						classProp={`${isLoggedin ? 'display-hidden' : ''}`}
						redirect={'/register'}
					>
						Kaydol
					</Button>
				</div>
				<div className='menu nav-container'>
					<Link
						onClick={() => {
							if (i18n.language === 'en') {
								handleLanguageChange('tr');
								return;
							}
							handleLanguageChange('en');
						}}
						aria-label='language'
						style={{ display: 'contents' }}
					>
						<GrLanguage className='nav-item-icon' />
						{i18n.language === 'en' ? 'EN' : 'TR'}
					</Link>
					<Link aria-label='user' to='/login' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link>
					<HiOutlineMenuAlt3
						className='nav-item-icon'
						id='menu-button'
						onClick={() => {
							setMenuOpen(!menuOpen);
							if (typeof window != 'undefined' && window.document) {
								document.body.style.overflow = 'hidden';
							}
						}} //menu acıp scroll kapatıyor
					/>
				</div>
			</nav>
			<motion.ul
				variants={rightToLeft}
				initial='initial'
				whileInView='animate'
				className={`text-accent-400 bg-primary-400 box-shadow ${
					menuOpen ? 'menu-open' : 'display-hidden'
				}`}
				id='menu-navigation'
				custom={windowWidth}
			>
				<FiX className='navbar-xmark' onClick={toggleNavMenu} />
				<div className='menu-inner-container' key='menucon'>
					<hr />
					{paths.map((path, index) => {
						return (
							<>
								<li>
									<NavLink onClick={toggleNavMenu} to={path.path} key={index}>
										{path.label}
									</NavLink>
								</li>
								<hr />
							</>
						);
					})}
				</div>
				<div className='footer-social-container nav-menu-social-container'>
					{icons.map((icon, index) => (
						<motion.div
							key={index}
							initial='initial'
							whileHover='animate'
							className='relative-position icon-light-container'
						>
							<motion.div
								variants={backgroundFill}
								className='social-icon-background'
								style={
									icon.backgroundColor && {
										backgroundColor: icon.backgroundColor,
									}
								}
							>
								{icon.backgroundImage && (
									<img
										src={icon.backgroundImage}
										style={{ borderRadius: '30px' }}
									/>
								)}
							</motion.div>
							<motion.div variants={socialSlide}>
								<Link to={icon.href}>
									<icon.Icon
										className='icon footer-social-side'
										aria-label={icon.label}
									/>
									<icon.Icon className='icon' aria-label={icon.label} />
								</Link>
							</motion.div>
						</motion.div>
					))}
				</div>
				<Button
					onClick={toggleNavMenu}
					redirect={'/register'}
					classProp={`${isLoggedin ? 'display-hidden' : ''}`}
				>
					Kaydol
				</Button>
			</motion.ul>
		</div>
	);
}
export default Navbar;
