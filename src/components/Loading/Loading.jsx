import React from 'react';
import './Loading.css';
function Loading() {
	return (
		<div
			style={{
				height: '50vh',
				margin: 'auto',
				display: 'flex',
				flexWrap: 'wrap',
				alignContent: 'flex-end',
			}}
		>
			<span class='loader'></span>
		</div>
	);
}
export default Loading;
