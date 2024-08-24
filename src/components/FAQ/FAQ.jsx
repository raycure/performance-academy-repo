import React from 'react';
import FAQItem from './FAQItem';
import { faqQuestions } from './FAQQuestions';

function FAQ() {
	return (
		<div className='faq-outer-container'>
			<div className='faq-selector-container'>
				{faqQuestions.map(() => {
					<FAQItem></FAQItem>;
				})}
			</div>
			<>
				<p className='faq-question'></p>
				<div className='faq-answer'></div>
			</>
		</div>
	);
}
export default FAQ;
