import React from 'react';
import logo from '../../assets/LesmillsLogo.png';
import './registerStyle.css';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import background from '../../assets/BODYBALANCE-WALLPAPER.png';
function AuthenticationGreet() {
	return (
		<div className='authentication-greeting-container relative-position'>
			<img
				src={background}
				alt='background'
				className='background-image authentication-background'
			/>
			<img alt='logo' className='logo' src={logo}></img>
			<div className='greeting-content-container'>
				<p className='fs-secondary-heading'>Merhabalar!</p>
				<p className='fs-400'>
					We’re on a mission to create a fitter planet. This doesn’t
					mean making people work out. It means helping people fall in
					love with fitness so that they want to work out.
				</p>
				<div className='greeting-social-icons'>
					<div className='icon-light-container'>
						<Link to='https://www.instagram.com/lesmills/'>
							<FaInstagram className='icon' aria-label='social' />
						</Link>
					</div>
					<div className='icon-light-container'>
						<Link to='https://www.youtube.com/user/lesmillsgroupfitness'>
							<FaYoutube
								className='icon'
								aria-label='social icon'
							/>
						</Link>
					</div>
					<div className='icon-light-container'>
						<Link to='https://www.tiktok.com/@lesmills'>
							<FaTiktok
								className='icon'
								aria-label='social icon'
							/>
						</Link>
					</div>
					<div className='icon-light-container'>
						<Link to='https://www.facebook.com/lesmills'>
							<FaFacebookF
								className='icon'
								aria-label='social icon'
							/>
						</Link>
					</div>
				</div>
			</div>
			<p className='text-legal text-white'>
				Bir hesap oluşturduğunuzda, Kullanım Koşulları'nı kabul etmiş
				olursunuz.
			</p>
		</div>
	);
}
export default AuthenticationGreet;
