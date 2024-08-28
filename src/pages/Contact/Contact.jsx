import React from 'react';
import FAQ from '../../components/FAQ/FAQ';
import ContactForm from '../../components/Forms/ContactForm';

function Contact() {
	return (
		<div>
			<FAQ />
			<div id='contact-form-grad'>
				<ContactForm />
			</div>
		</div>
	);
}
export default Contact;
