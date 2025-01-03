import React, { useEffect, useRef, useState } from 'react';
import '../../pages/Register-Login/formStyle.css';
import Button from '../Button/Button';
import '../../components/Containers/containerStyle.css';
import '../../pages/Contact/Contact.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../auth/auth.service';
import HoneypotInput from './HoneypotInput';
import contactImage from '../../assets/contactImage.png';
function ContactForm() {
	const contactForm = useRef();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [topic, setTopic] = useState('');
	const [question, setQuestion] = useState('');

	const { t, i18n } = useTranslation('translation');
	const dispatch = useDispatch();

	async function handlePublicContactFormSubmission() {
		try {
			const contactFormData = {
				name,
				surname,
				email,
				topic,
				question,
			};

			const response = await dispatch(
				AuthService({
					data: contactFormData,
					endpoint: '/submitContactForm/public',
					method: 'POST',
				})
			);

			setName('');
			setSurname('');
			setEmail('');
			setTopic('');
			setQuestion('');
		} catch (err) {
			console.log('err', err);
		}
	}
	async function handlePrivateContactFormSubmission() {
		try {
			const contactFormData = {
				topic,
				question,
			};

			const response = await dispatch(
				AuthService({
					data: contactFormData,
					endpoint: '/submitContactForm/protected',
					method: 'POST',
				})
			);
			setTopic('');
			setQuestion('');
		} catch (err) {
			console.log('err', err);
		}
	}

	let isLoggedIn = useSelector(selectIsLoggedIn);
	return (
		<div className='contact-form relative-position'>
			<img src={contactImage} alt='background' className='background-image' />

			<form
				onSubmit={(e) => {
					e.preventDefault();
					name || surname || email
						? handlePublicContactFormSubmission()
						: handlePrivateContactFormSubmission();
				}}
				ref={contactForm}
				className='contact-form-outer-container'
			>
				<p className='fs-800 text-container'>{t('Contact.Form.Title')}</p>
				{!isLoggedIn && (
					<>
						<div className='contact-name-input-container'>
							<div className={' centerLineAnimation'}>
								<input
									onChange={(e) => setName(e.target.value)}
									value={name}
									required
									placeholder={t('Contact.Form.Name')}
									type='text'
								/>
							</div>
							<div className={' centerLineAnimation'}>
								<input
									onChange={(e) => setSurname(e.target.value)}
									value={surname}
									required
									placeholder={t('Contact.Form.Surname')}
									type='text'
								/>
							</div>
						</div>
						<div className=' centerLineAnimation'>
							<input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
								placeholder='Email'
								type='email'
							/>
						</div>
					</>
				)}

				<div className='centerLineAnimation'>
					<input
						placeholder={t('Contact.Form.Topic')}
						onChange={(e) => setTopic(e.target.value)}
						value={topic}
						required
						type='text'
					/>
				</div>

				<HoneypotInput />
				<div className='divForBorder'>
					<textarea
						required
						className='custom-textarea'
						placeholder={t('Contact.Form.Context') + '...'}
						rows='7'
						data-role='none'
						onChange={(e) => setQuestion(e.target.value)}
						value={question}
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

				<Button
					disabled={
						isLoggedIn === true
							? !question || !topic
							: !question || !name || !surname || !email || !topic
					}
					type='submit'
				>
					{i18n.language === 'en' ? 'Send' : 'Gönder'}
				</Button>
			</form>
		</div>
	);
}
export default ContactForm;
