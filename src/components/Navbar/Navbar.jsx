import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import Button from '../Button/Button';
import logo from '../../assets/LesmillsLogo.png';
function Navbar() {
	return (
		<>
			<nav className='nav-container'>
				<Link aria-label='logo'>
					<img alt='beep' className='img' src={logo}></img>
				</Link>
				<ul className='nav-item-container'>
					<li className='nav-item'>
						<Link to='/' className='nav-item'>
							Ana Sayfa
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/classes' className='nav-item'>
							Kurslar
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/news' className='nav-item'>
							Duyurular
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/myCourses' className='nav-item'>
							Benim Kurslarım
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/contact' className='nav-item'>
							İletişim
						</Link>
					</li>
				</ul>
				<div className=' nav-item-container'>
					<Link
						to='userInfo'
						className='nav-item '
						aria-label='user Info or login'
					>
						<FaUser className='nav-item-icon' />
					</Link>
					<Button className='nav-button'>Kaydol</Button>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
