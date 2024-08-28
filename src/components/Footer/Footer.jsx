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
import { useEffect } from 'react';
function Footer() {
	useEffect(() => {
		const animatedElements = document.querySelectorAll('.addLineAnimation');

		animatedElements.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				element.classList.add('lineAnimation');
				element.addEventListener('mouseleave', () => {
					element.classList.add('notHoveredLineAnimation');
				});
				element.classList.remove('notHoveredLineAnimation');
			});
		});
	});

	return (
		<div className='footer-outer-container'>
			<div className='footer-social-container'>
				<div className='footer-horizontal-line'>
					<hr />
				</div>
				<div className=''>
					<Link to='https://www.instagram.com/lesmills/'>
						<FaInstagram className='icon' aria-label='social' />
					</Link>
				</div>
				<div className=''>
					<Link to='https://www.youtube.com/user/lesmillsgroupfitness'>
						<FaYoutube className='icon' aria-label='social icon' />
					</Link>
				</div>
				<div className=''>
					<Link to='https://www.tiktok.com/@lesmills'>
						<FaTiktok className='icon' aria-label='social icon' />
					</Link>
				</div>
				<div className=''>
					<Link to='https://www.linkedin.com/company/les-mills-international/'>
						<FaLinkedinIn
							className='icon'
							aria-label='social icon'
						/>
					</Link>
				</div>
				<div className=''>
					<Link to='https://www.facebook.com/lesmills'>
						<FaFacebookF
							className='icon'
							aria-label='social icon'
						/>
					</Link>
				</div>
				<div className=''>
					<Link to='https://tr.pinterest.com/lesmills/'>
						<FaPinterestP
							className='icon'
							aria-label='social icon'
						/>
					</Link>
				</div>
				<div className='footer-horizontal-line'>
					<hr />
				</div>
			</div>
			<div className='footer-container'>
				<img src={logo} alt='lesmills logo' className='logo' />
				<p className='text-legal licence-text '>
					©licenced by my ass 🍑
				</p>
				<div className='footer-link-con'>
					<HashLink
						to='/iletişim#contact-form-grad'
						className='addLineAnimation'
					>
						Bize Ulaşın
					</HashLink>
					<HashLink className='addLineAnimation' to='/iletişim#top'>
						Sık Sorulan Sorular
					</HashLink>
					<HashLink
						className='addLineAnimation'
						to='/kişisel-verilerin-korunması#top'
					>
						Kişisel Verilerin Korunması
					</HashLink>
					<HashLink className='addLineAnimation' to='/çerezler#top'>
						Çerezler
					</HashLink>
				</div>
			</div>
		</div>
	);
}
export default Footer;
