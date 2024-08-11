import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
function Navbar() {
	return (
		<>
			<nav className='nav-container'>
				<ul>
					<li>
						<Link to='' className='nav-item'>
							Ana Sayfa
						</Link>
					</li>
					<li>
						<Link to='' className='nav-item'>
							Kurslar
						</Link>
					</li>
					<li>
						<Link to='' className='nav-item'>
							Duyurular
						</Link>
					</li>
					<li>
						<Link to='' className='nav-item'>
							Benim Kurslarım
						</Link>
					</li>
					<li>
						<Link to='' className='nav-item'>
							İletişim
						</Link>
					</li>
				</ul>
				<Link to='' className='nav-item-icon'>
					<FaUser />
				</Link>
				<Button className='nav-button'>Kaydol</Button>
			</nav>
		</>
	);
}
export default Navbar;
