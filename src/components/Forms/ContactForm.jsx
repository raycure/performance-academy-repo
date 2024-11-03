import React, { useRef } from 'react';
import '../../pages/Register-Login/formStyle.css';
import Button from '../Button/Button';
import '../../components/Containers/containerStyle.css';
import { motion } from 'framer-motion';

function ContactForm() {
	const contactForm = useRef();
	const windowWidth = window.innerWidth;
	return (
		<div className='contact-form relative-position ' id='contact-form-grad'>
			<img
				src='/ornek.jpg'
				alt='background'
				className='background-image contact-form-background'
			/>
			<div className='container even-columns'>
				{windowWidth >= 535 && (
					<div style={{ width: 'fit-content' }}>
						<p className='contact-form-header fs-secondary-heading text-container'>
							Aradığınızı Bulamadınız Mı?
						</p>
						<p className='contact-form-header fs-secondary-heading text-container '>
							Bize Erişin!
						</p>
					</div>
				)}
				<div
					ref={contactForm}
					className='contact-form-outer-container box-shadow'
				>
					{windowWidth < 535 && (
						<div>
							<p className='contact-form-header fs-secondary-heading text-container'>
								Aradığınızı Bulamadınız Mı?
							</p>
							<p className='contact-form-header fs-900 text-container'>
								Bize Erişin!
							</p>
						</div>
					)}
					<div className='contact-name-input-container'>
						<div className='centerLineAnimation'>
							<input placeholder='Adınız' type='text' />
						</div>
						<div className='centerLineAnimation'>
							<input placeholder='Soyadınız' type='text' />
						</div>
					</div>

					<div className='centerLineAnimation'>
						<input placeholder='Mailiniz' type='email' />
					</div>
					<div className='centerLineAnimation'>
						<input placeholder='Konu' type='text' />
					</div>

					<div className='divForBorder'>
						<textarea
							className='custom-textarea'
							placeholder='Mesajınız...'
							rows='5'
							data-role='none'
						></textarea>
						<span className='textarea-bottom-left-line'></span>
						<span className='textarea-bottom-right-line'></span>
						<span className='textarea-right-upper-line'></span>
						<span className='textarea-right-lower-line'></span>
						<span className='textarea-left-upper-line'></span>
						<span className='textarea-left-lower-line'></span>
						<span className='textarea-top-left-line'></span>
						<span className='textarea-top-right-line'></span>
					</div>
					<Button>Gönder</Button>
				</div>
			</div>
		</div>
	);
}
export default ContactForm;
