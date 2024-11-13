import React from 'react';
import './bannerStyle.css';
import Container from '../Containers/Container';

const Banner = () => {
	const bannerData = {
		title: 'MOVE THE WAY YOU WANT TO',
		features: [
			{
				icon: '',
				description:
					'Strength, cardio, yoga, martial arts, cycling, wellness + more. Enjoy 2500+ workouts at your fingertips.',
			},
			{
				icon: '',
				description: 'Choose workouts with or without equipment.',
			},
			{
				icon: '',
				description:
					'Workouts for all fitness levels that are scientifically designed to get results',
			},
		],
	};

	const bannerStyle = {
		backgroundColor: 'transparent',
		textAlign: 'center',
	};

	return (
		<Container>
			<div className='gridCardContainer'>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>1</span>
					</div>
					<div className='gridCardHeading center-item'>
						<h2 className='fs-minimal-heading'>SIGN UP FOR TRAINING</h2>
					</div>
					<p>
						Book onto an initial training course at a time <br />
						and place that suits
					</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>2</span>
					</div>

					<div className='gridCardHeading center-item'>
						<h2 className='fs-minimal-heading'>ATTEND TRAINING</h2>
					</div>
					<p>
						Get a taste of your new role
						<br /> by learning a short choreographed track
					</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>3</span>
					</div>
					<div className='gridCardHeading'>
						<h2 className='fs-minimal-heading center-item'>PRE-WORK</h2>
					</div>
					<p>
						Join your new teammates online or <br />
						in-person for world-leading training
					</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>4</span>
					</div>
					<div className='gridCardHeading'>
						<h2 className='fs-minimal-heading center-item '>
							SUBMIT YOUR VIDEO
						</h2>
					</div>
					<p>
						After passing initial training your final step is <br />
						to submit an assessment video
					</p>
				</div>
			</div>
		</Container>
	);
};

export default Banner;
