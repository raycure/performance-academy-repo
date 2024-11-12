import React, { useRef, useState } from 'react';
import '../../pages/Register-Login/formStyle.css';
import Button from '../Button/Button';
import '../../components/Containers/containerStyle.css';
import '../../pages/Contact/Contact.css';
import { useTranslation } from 'react-i18next';

function ContactForm() {
	const contactForm = useRef();
	const [Name, setName] = useState('');
	const [Surname, setSurname] = useState('');
	const [Mail, setMail] = useState('');
	const [Topic, setTopic] = useState('');
	const [Context, setContext] = useState('');
	const { t, i18n } = useTranslation('translation');
	return (
		<div className='contact-form relative-position ' id='contact-form-grad'>
			<img
				src='/ornek.jpg'
				alt='background'
				className='background-image contact-form-background'
			/>

			<form
				ref={contactForm}
				className='contact-form-outer-container box-shadow'
			>
				<p className='contact-form-header fs-900 text-container'>
					{t('Contact.Form.Title')}
				</p>
				<div className='contact-name-input-container'>
					<div className='centerLineAnimation'>
						<input
							onChange={(e) => setName(e.target.value)}
							value={Name}
							required
							placeholder={t('Contact.Form.Name')}
							type='text'
						/>
					</div>
					<div className='centerLineAnimation'>
						<input
							onChange={(e) => setSurname(e.target.value)}
							value={Surname}
							required
							placeholder={t('Contact.Form.Surname')}
							type='text'
						/>
					</div>
				</div>

				<div className='centerLineAnimation'>
					<input
						onChange={(e) => setMail(e.target.value)}
						value={Mail}
						required
						placeholder='Mail'
						type='email'
					/>
				</div>
				<div className='centerLineAnimation'>
					<input
						onChange={(e) => setTopic(e.target.value)}
						value={Topic}
						required
						placeholder={t('Contact.Form.Topic')}
						type='text'
					/>
				</div>

				<div className='divForBorder'>
					<textarea
						required
						className='custom-textarea'
						placeholder={t('Contact.Form.Context') + '...'}
						rows='5'
						data-role='none'
						onChange={(e) => setContext(e.target.value)}
						value={Context}
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
				<Button disabled={!Context || !Name || !Surname || !Mail || !Topic}>
					{i18n.language === 'en' ? 'Send' : 'Gönder'}
				</Button>
			</form>
		</div>
	);
}
export default ContactForm;
