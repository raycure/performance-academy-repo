import React, { useState } from 'react';
import './cardStyle.css';

function Card({ backContent, frontContent }) {
	const [flipped, setFlipped] = useState(false);

	const handleClick = () => {
		setFlipped(!flipped);
	};

	return (
		<div
			className='card-container user-select-none'
			onMouseEnter={handleClick}
			onMouseLeave={handleClick}
		>
			<div className={`card ${flipped ? 'flipped' : ''}`}>
				<div className='front'>{frontContent}</div>
				<div className='back'>{backContent} </div>
			</div>
		</div>
	);
}

export default Card;
