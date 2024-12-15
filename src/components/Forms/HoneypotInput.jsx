import { useState } from 'react';

function HoneypotInput() {
	function handleBotAttempt() {
		localStorage.setItem('botAttempt', 'true');
		setIsBotAttempt(true);
	}
	const [isBotAttempt, setIsBotAttempt] = useState(false);
	return (
		<input
			type='text'
			name='honeypot'
			style={{ display: 'none' }}
			value={isBotAttempt}
			onChange={(e) => {
				e.preventDefault();
				handleBotAttempt();
			}}
			tabIndex='-1'
			autoComplete='off'
		/>
	);
}

export default HoneypotInput;
