import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom'; //u cant style the links directly
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/LesmillsLogo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<nav className='nav-container outer-container'>
				<Link aria-label='logo' style={{ display: 'contents' }}>
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
					<Link aria-label='user' style={{ display: 'contents' }}>
						<FaUser className='nav-item-icon' />
					</Link>

					<Button>Kaydol</Button>
				</div>
				<div className='menu'>
					<HiOutlineMenuAlt3
						className='menu-icon'
						onClick={() => {
							setMenuOpen(!menuOpen);
							//console.log(menuOpen);
						}}
					/>
					<ul
						className={`text-accent-400 ${
							menuOpen ? 'open' : 'close'
						}`}
					>
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
				</div>
			</nav>
		</>
	);
}
export default Navbar;
