import React, { useRef } from 'react';
import './Form.css';
import Button from '../Button/Button';

function ContactForm() {
	const contactForm = useRef();
	return (
		<div className='contact-form relative-position box-shadow'>
			<img
				src='/ornek.jpg'
				alt='background'
				className='background-image contact-form-background'
			/>
			<div>
				<p className='contact-form-header fs-secondary-heading text-container'>
					Aradığınızı Bulamadınız Mı?
				</p>
				<p className='contact-form-header fs-900 text-container'>
					Bize Erişin!
				</p>
			</div>
			<div ref={contactForm} className='contact-form-outer-container'>
				<div className='contact-name-input-container'>
					<input placeholder='Adınız' type='text' />
					<input placeholder='Soyadınız' type='text' />
				</div>
				<input placeholder='Mailiniz' type='email' />
				<input placeholder='Konu' type='text' />
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
