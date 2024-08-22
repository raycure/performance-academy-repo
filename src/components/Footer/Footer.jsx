import React from 'react';
import './Footer.css';
import logo from '../../assets/LesmillsLogo.png';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaPinterestP } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
function Footer() {
	return (
		<div className='footer-container'>
			<div className='footer-grid'>
				<div className='justify'>
					<img src={logo} alt='lesmills logo' className='logo' />
					<p>
						We’re on a mission to create a fitter planet. This
						doesn’t mean making people work out. It means helping
						people fall in love with fitness so that they want to
						work out.
					</p>
				</div>
				<div className='justify'>
					<HashLink to=''>Hakkımızda</HashLink>
					<Link to='/iletişim'>İletişim</Link>
					<HashLink to='/iletişim#'>Sık Sorulan Sorular</HashLink>
					<Link to=''>Korsan İhbar</Link>
				</div>
				<div className='justify'>
					<div className='footer-link-container'>
						<Link to='/etkinlikler'>Etkinlik Bul</Link>
						<Link to=''>Giriş Yap</Link>
					</div>
					<div className='footer-social-container'>
						<Link
							to='https://www.instagram.com/lesmills/'
							className='icon-light-container bg-primary-300'
						>
							<FaInstagram
								className='icon'
								aria-label='social icon'
							/>
						</Link>
						<div className='icon-light-container bg-primary-300'>
							<FaYoutube
								className='icon'
								aria-label='social icon'
							/>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<FaTiktok
								className='icon'
								aria-label='social icon'
							/>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<FaLinkedinIn
								className='icon'
								aria-label='social icon'
							/>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<FaFacebookF
								className='icon'
								aria-label='social icon'
							/>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<FaPinterestP
								className='icon'
								aria-label='social icon'
							/>
						</div>
					</div>
				</div>
			</div>
			<p className='licence-text'>licenced by my ass</p>
		</div>
	);
}
export default Footer;
