import React from 'react';
import logo from '../../assets/LesmillsLogo.png';
import './registerStyle.css';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import background from '../../assets/BODYBALANCE-WALLPAPER.png';
import { motion } from 'framer-motion';
import {
	socialSlide,
	backgroundFill,
} from '../../components/animations/AnimationValues';
import instagramBackground from '../../assets/instagram-background.jpg';
function AuthenticationGreet() {
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
	];
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
					We’re on a mission to create a fitter planet. This doesn’t mean making
					people work out. It means helping people fall in love with fitness so
					that they want to work out.
				</p>
				<div className='greeting-social-icons'>
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
			</div>
			<p className='text-legal text-white'>
				Bir hesap oluşturduğunuzda, Kullanım Koşulları'nı kabul etmiş olursunuz.
			</p>
		</div>
	);
}
export default AuthenticationGreet;
