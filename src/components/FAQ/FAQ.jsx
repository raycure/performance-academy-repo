import React, { useState } from 'react';
import FAQItem from './FAQItem';
import { faqQuestions } from '../../assets/FAQQuestions';
import './FAQ.css';
import { motion } from 'framer-motion';
import {
	leftToRight,
	ScalingAnimations,
} from '../animations/AnimationValues.jsx';

function FAQ() {
	const [activeQuestionTitle, setActiveQuestionTitle] = useState(null);
	const activeResponse = faqQuestions
		.filter((item) => {
			return item.title === activeQuestionTitle;
		})
		.map((item) => {
			return (
				<motion.div
					variants={ScalingAnimations}
					initial='hidden'
					animate='getBigger'
					key={activeQuestionTitle}
				>
					{' '}
					<div className='fw-regular fs-500'>{item.response}</div>
				</motion.div>
			);
		});
	return (
		<div className='faq-outer-container text-container'>
			<div>
				{faqQuestions.map((item, index) => {
					return (
						<motion.div
							key={index}
							variants={leftToRight}
							initial='hidden'
							whileInView='show'
							viewport={{ once: true }}
							custom={index}
						>
							<div
								className={`${
									activeQuestionTitle === item.title
										? 'faq-item-active'
										: ''
								}`}
								onClick={() =>
									setActiveQuestionTitle(item.title)
								}
							>
								<FAQItem>{item.title}</FAQItem>
							</div>
						</motion.div>
					);
				})}
			</div>
			<div>
				{activeQuestionTitle === null && (
					<motion.p
						variants={leftToRight}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}
						className='fs-primary-heading'
					>
						Merak ettiğiniz bir şey mi var?
					</motion.p>
				)}
				{activeResponse}
			</div>
		</div>
	);
}
export default FAQ;
