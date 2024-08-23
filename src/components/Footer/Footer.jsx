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
					<HashLink to='/'>Hakkımızda</HashLink>
					<HashLink to='/iletişim#top'>İletişim</HashLink>
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
							<Link to='https://www.youtube.com/user/lesmillsgroupfitness'>
								<FaYoutube
									className='icon'
									aria-label='social icon'
								/>
							</Link>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<Link to='https://www.tiktok.com/@lesmills'>
								<FaTiktok
									className='icon'
									aria-label='social icon'
								/>
							</Link>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<Link to='https://www.linkedin.com/company/les-mills-international/'>
								<FaLinkedinIn
									className='icon'
									aria-label='social icon'
								/>
							</Link>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<Link to='https://www.facebook.com/lesmills'>
								<FaFacebookF
									className='icon'
									aria-label='social icon'
								/>
							</Link>
						</div>
						<div className='icon-light-container bg-primary-300'>
							<Link to='https://tr.pinterest.com/lesmills/'>
								<FaPinterestP
									className='icon'
									aria-label='social icon'
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='text-legal footer-legal-container'>
				<HashLink to='/kişisel-verilerin-korunması#top'>
					Kişisel Verilerin Korunması
				</HashLink>
				<HashLink to='/çerezler#top'>Çerezler</HashLink>
				<p className='licence-text '>©licenced by my ass 🍑</p>
			</div>
		</div>
	);
}
export default Footer;
