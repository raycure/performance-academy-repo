import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; //u cant style the links directly
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/LesmillsLogo.png';
function Navbar() {
	return (
		<>
			<nav className='nav-container outer-container'>
				<Link aria-label='logo' style={{ display: 'contents' }}>
					<img alt='beep' className='logo' src={logo}></img>
				</Link>
				<ul className='nav-list-container nav-container'>
					<li>
						<Link to='/'>Ana Sayfa</Link>
					</li>
					<li>
						<Link to='/programlar'>Kurslar</Link>
					</li>
					<li>
						<Link to='/duyurular'>Duyurular</Link>
					</li>
					<li>
						<Link to='/kurslarım'>Kurslarım</Link>
					</li>
					<li>
						<Link to='/iletişim'>İletişim</Link>
					</li>
				</ul>
				<div className='nav-btn-container nav-container'>
					<Link aria-label='user' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link>

					<Button>Kaydol</Button>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
