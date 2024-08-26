import React, { useRef } from 'react';
import './ContactForm.css';
import InputContainer from '../Containers/InputContainer';
import Button from '../Button/Button';
function ContactForm() {
	const contactForm = useRef();
	return (
		<div className='contact-form relative-position'>
			<img
				src='/ornek.jpg'
				alt='background'
				className='background-image contact-form-background'
			/>
			<p className='contact-form-header fs-primary-heading text-container'>
				{`Aradığınızı Bulamadınız Mı? \nBize Erişin!`}
			</p>
			<div ref={contactForm} className='contact-form-outer-container'>
				<div className='contact-name-input-container'>
					<InputContainer placeholder='Adınız' type='text' />
					<InputContainer placeholder='Soyadınız' type='text' />
				</div>
				<InputContainer placeholder='Mailiniz' type='email' />
				<InputContainer placeholder='Konu' type='text' />
				<InputContainer
					type='textarea'
					placeholder='Mesajınız...'
					size='large'
				/>
				<Button>Gönder</Button>
			</div>
		</div>
	);
}
export default ContactForm;
