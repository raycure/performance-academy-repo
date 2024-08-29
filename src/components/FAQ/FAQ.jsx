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
	const windowWidth = window.innerWidth;
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
		<div className='faq-outer-container text-container bottom-space'>
			<div>
				{windowWidth <= 1100 && (
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
								{windowWidth <= 1100 &&
									activeQuestionTitle === item.title &&
									activeResponse}
							</div>
						</motion.div>
					);
				})}
			</div>
			<div>
				{windowWidth > 1100 && activeQuestionTitle === null && (
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
				{windowWidth > 1100 && activeResponse}
			</div>
		</div>
	);
}
export default FAQ;
