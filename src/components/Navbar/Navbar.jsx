import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; //u cant style the links directly
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/LesmillsLogo.png';
function Navbar() {
	const logoStyle = {
		width: '40%',
		display: 'inline-block',
	};
	const listItem = {
		textDecoration: 'none',
	};
	return (
		<>
			<nav className='nav-container'>
				<Link aria-label='logo' style={logoStyle}>
					<img alt='beep' className='logo' src={logo}></img>
				</Link>
				<ul className='nav-list-container nav-container'>
					<li className='nav-item'>
						<Link to='/' style={listItem}>
							Ana Sayfa
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/classes' style={listItem}>
							Kurslar
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/news' style={listItem}>
							Duyurular
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/myCourses' style={listItem}>
							Benim Kurslarım
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/contact' style={listItem}>
							İletişim
						</Link>
					</li>
				</ul>
				<div className='nav-btn-container nav-container'>
					<FaUser className='nav-item-icon' />

					<Button className='nav-button'>Kaydol</Button>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
