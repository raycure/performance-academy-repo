import React, { useRef } from 'react';
import './Form.css';
import Button from '../Button/Button';

function ContactForm() {
	const contactForm = useRef();
	const windowWidth = window.innerWidth;
	return (
		<div className='contact-form relative-position '>
			<img
				src='/ornek.jpg'
				alt='background'
				className='background-image contact-form-background'
			/>
			{windowWidth >= 535 && (
				<div>
					<p className='contact-form-header fs-secondary-heading text-container'>
						Aradığınızı Bulamadınız Mı?
					</p>
					<p className='contact-form-header fs-900 text-container'>
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

				<div className='centerLineAnimation' style={{ width: '100%' }}>
					<input placeholder='Mailiniz' type='email' />
				</div>
				<div className='centerLineAnimation' style={{ width: '100%' }}>
					<input placeholder='Konu' type='text' />
				</div>
				<textarea
					placeholder='Mesajınız...'
					rows='5'
					data-role='none'
				/>
				<Button>Gönder</Button>
			</div>
		</div>
	);
}
export default ContactForm;
