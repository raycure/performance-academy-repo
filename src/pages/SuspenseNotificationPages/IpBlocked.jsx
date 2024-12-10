import React from 'react';

const AccessSuspended = () => {
	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<h1 style={styles.heading}>Access Suspended</h1>
				<p style={styles.text}>
					Your account or IP address has been temporarily blocked.
				</p>
				<p style={styles.text}>
					Please contact support if you believe this is an error.
				</p>
			</div>
		</div>
	);
};

const styles = {
	body: {
		fontFamily: 'Arial, sans-serif',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		margin: 0,
		backgroundColor: '#f4f4f4',
	},
	container: {
		textAlign: 'center',
		backgroundColor: 'white',
		padding: '2rem',
		borderRadius: '10px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	},
	heading: {
		color: '#d9534f',
	},
	text: {
		color: '#666',
	},
};

export default AccessSuspended;
