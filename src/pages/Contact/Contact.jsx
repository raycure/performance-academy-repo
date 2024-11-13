import React from 'react';
import FAQ from '../../components/FAQ/FAQ';
import ContactForm from '../../components/Forms/ContactForm';
import ValueBar from '../../components/ValueBar/ValueBar';
import './Contact.css';
import { useTranslation } from 'react-i18next';
function Contact() {
	const { t, i18n } = useTranslation('translation');
	return (
		<>
			<section>
				<p className='fs-650 contact-text'>
					{t('Contact.GreetText.0')}
					<br /> {t('Contact.GreetText.1')}
				</p>
			</section>
			<ValueBar />
			<div id='contact-form-grad '>
				<ContactForm />
			</div>
		</>
	);
}
export default Contact;
