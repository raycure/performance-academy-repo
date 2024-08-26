import React, { useState } from 'react';
import FAQItem from './FAQItem';
import { faqQuestions } from '../../assets/FAQQuestions';
import './FAQ.css';
function FAQ() {
	const [activeQuestionTitle, setActiveQuestionTitle] = useState(null);
	const activeResponse = faqQuestions
		.filter((item) => {
			return item.title === activeQuestionTitle;
		})
		.map((item) => {
			return <div className='fw-regular fs-500'>{item.response}</div>;
		});
	return (
		<div className='faq-outer-container text-container'>
			<div>
				{faqQuestions.map((item) => {
					return (
						<div
							className={`${
								activeQuestionTitle === item.title
									? 'faq-item-active'
									: ''
							}`}
							onClick={() => setActiveQuestionTitle(item.title)}
						>
							<FAQItem>{item.title}</FAQItem>
						</div>
					);
				})}
			</div>
			<div>
				{activeQuestionTitle === null && (
					<p className='fs-primary-heading'>
						Merak ettiğiniz bir şey mi var?
					</p>
				)}
				{activeResponse}
			</div>
		</div>
	);
}
export default FAQ;
