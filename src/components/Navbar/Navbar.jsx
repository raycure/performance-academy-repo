import React, { useState, useEffect, useLayoutEffect } from 'react';
import './Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'; //u cant style the links directly
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
import { socialSlide, backgroundFill } from '../animations/AnimationValues';
import instagramBackground from '../../assets/instagram-background.jpg';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import axios from '../../pages/api/axios';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { AuthService } from '../../auth/auth.service';
import { useDispatch } from 'react-redux';
function Navbar() {
	const dispatch = useDispatch();
	let isLoggedIn = useSelector(selectIsLoggedIn);
	const navigate = useNavigate();
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
			path: '/süreç',
			label: t('Navbar.Process'),
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

	const handleResize = () => {
		setMenuOpen(false);
		document.body.style.overflowY = 'unset';
	};
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); //in the event of a resize closes the menu and makes the page scrollable again

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
	const handleUserDropdownClickOutside = (event) => {
		const path = event.composedPath ? event.composedPath() : [];
		if (
			!path.some(
				(el) =>
					el.id === 'navbar-dropdown' || el.id === 'navbar-dropdown-button'
			)
		) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleUserDropdownClickOutside);
		} else {
			document.removeEventListener('mousedown', handleUserDropdownClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleUserDropdownClickOutside);
		};
	}, [isOpen]);

	async function handleLogout() {
		const response = await dispatch(
			AuthService({ endpoint: '/logout', method: 'POST' })
		);
		localStorage.removeItem('accessToken');
	}

	return (
		<div className='navigation-outer-container user-select-none' id='navbar'>
			<nav className='nav-container nav-inner-container'>
				<Link to='/' aria-label='logo' style={{ display: 'contents' }}>
					<img alt='LessMills logo' className='pfa-logo' src={logo}></img>
				</Link>
				<ul className='nav-list-container nav-container text-accent-400'>
					{paths.map((path, index) => {
						return (
							<li className='nav-list-item relative-position' key={path.label}>
								<NavLink to={path.path}>{path.label}</NavLink>
							</li>
						);
					})}
				</ul>
				<div className='nav-btn-container nav-container'>
					<div className='userDropDown' onClick={toggleDropdown}>
						<FaUser id='navbar-dropdown-button' className='nav-item-icon' />
						<div
							id='navbar-dropdown'
							style={{ ...(isLoggedIn && { transform: 'translateX(-85%)' }) }}
							className={`dropdown-content ${isOpen ? 'open' : 'closed'}`}
						>
							{isLoggedIn ? (
								<>
									<h4
										onClick={() => {
											navigate('/bilgilerim');
										}}
									>
										{i18n.language === 'en' ? 'My Account' : 'Hesabım'}
									</h4>
									<h4
										onClick={() => {
											navigate('/programlarım');
										}}
									>
										{i18n.language === 'en' ? 'My Programs' : 'Programlarım'}
									</h4>
									<h4 onClick={handleLogout}>
										{i18n.language === 'en' ? 'Logout' : 'Çıkış Yap'}
									</h4>
								</>
							) : (
								<>
									<h4
										onClick={() => {
											navigate('/giriş-yap');
										}}
									>
										{i18n.language === 'en' ? 'Login' : 'Giriş Yap'}
									</h4>
									<h4
										onClick={() => {
											navigate('/kaydol');
										}}
									>
										{i18n.language === 'en' ? 'Sign Up' : 'Kaydol'}
									</h4>
								</>
							)}
						</div>
					</div>
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
						<div style={{ display: 'flex', gap: '3px' }}>
							<GrLanguage className='nav-item-icon' />
							{i18n.language === 'en' ? 'EN' : 'TR'}
						</div>
					</Link>
					<Button
						classProp={`${isLoggedIn ? 'display-hidden' : ''}`}
						redirect={'/kaydol'}
					>
						{i18n.language === 'en' ? 'Sign Up' : 'Kaydol'}
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
						<div style={{ display: 'flex', gap: '3px' }}>
							<GrLanguage className='nav-item-icon' />
							{i18n.language === 'en' ? 'EN' : 'TR'}
						</div>
					</Link>
					<div className='userDropDown' onClick={toggleDropdown}>
						<FaUser id='navbar-dropdown-button' className='nav-item-icon' />
						<div
							id='navbar-dropdown'
							style={{ top: '2rem' }}
							className={`dropdown-content ${isOpen ? 'open' : 'closed'}`}
						>
							{isLoggedIn ? (
								<>
									<h4
										onClick={() => {
											navigate('/bilgilerim');
										}}
									>
										{i18n.language === 'en' ? 'My Account' : 'Hesabım'}
									</h4>
									<h4
										onClick={() => {
											navigate('/programlarım');
										}}
									>
										{i18n.language === 'en' ? 'My Programs' : 'Programlarım'}
									</h4>
									<h4 onClick={handleLogout}>
										{i18n.language === 'en' ? 'Logout' : 'Çıkış Yap'}
									</h4>
								</>
							) : (
								<>
									<h4
										onClick={() => {
											navigate('/giriş-yap');
										}}
									>
										{i18n.language === 'en' ? 'Login' : 'Giriş Yap'}
									</h4>
									<h4
										onClick={() => {
											navigate('/kaydol');
										}}
									>
										{i18n.language === 'en' ? 'Sign Up' : 'Kaydol'}
									</h4>
								</>
							)}
						</div>
					</div>
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
			<ul
				className={`text-accent-400 bg-primary-400 menu-close ${
					menuOpen && 'box-shadow menu-open'
				}`}
				id='menu-navigation'
			>
				<FiX
					style={{
						alignSelf: 'flex-start',
						width: '1.5rem',
						height: '1.5rem',
						color: 'white',
						position: 'relative',
						left: '-2rem',
					}}
					onClick={toggleNavMenu}
				/>
				<div className='menu-inner-container'>
					<hr />
					{paths.map((path, index) => {
						return (
							<div style={{ height: '100%' }} key={path.label + index}>
								<li>
									<NavLink onClick={toggleNavMenu} to={path.path} key={index}>
										{path.label}
									</NavLink>
								</li>
								<hr />
							</div>
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
					redirect={'/kaydol'}
					classProp={`${isLoggedIn} && display-hidden`}
				>
					{i18n.language === 'en' ? 'Sign Up' : 'Kaydol'}
				</Button>
			</ul>
		</div>
	);
}
export default Navbar;
