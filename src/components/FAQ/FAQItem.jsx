import React from 'react';
import './FAQ.css';
import { MdArrowForwardIos } from 'react-icons/md';
function FAQItem({ children }) {
	return (
		<div className='faq-item-container user-select-none'>
			<p className='faq-title'>{children}</p>
			<MdArrowForwardIos />
		</div>
	);
}
export default FAQItem;
