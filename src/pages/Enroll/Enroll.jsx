import React, { useState } from 'react';
import './Enroll.css';
import EventList from '../../components/EventItem/EventList';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { useLocation } from 'react-router-dom';
function Enroll() {
	const location = useLocation();
	const [programID, setProgramID] = useState(
		location.state ? location.state : null
	);
	const classes = Object.keys(LesmillsPrograms()).map((category) =>
		LesmillsPrograms()[category].map((program) => {
			return (
				<button
					className={`light-container ${
						programID === program.id && 'bg-primary-300'
					}`}
					key={program.id}
					onClick={() => {
						setProgramID(program.id);
					}}
				>
					<img
						aria-label='logo'
						className='img category-logo'
						src={program.logo}
					/>
				</button>
			);
		})
	);
	const activeProgram = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((prog) => {
				return prog.id === programID;
			});
		})
		.filter(Boolean)[0];

	return (
		<>
			<section
				className='page-poster-container'
				style={{ paddingLeft: '5vw', flexDirection: 'column' }}
			>
				<img
					src='/ornek.jpg'
					alt='enroll page hero'
					className='background-image'
				/>
				{programID === null ? (
					<img
						src={backgroundText}
						alt='enroll page hero'
						className='hero-text'
					/>
				) : (
					<>
						<p className='poster-heading'>{activeProgram.title}</p>
						<p className='fs-secondary-heading'>{activeProgram.result}</p>
					</>
				)}
			</section>
			<section className='enroll-category'>{classes}</section>
			<EventList activeProgram={programID} programTitle={activeProgram.title} />
		</>
	);
}
export default Enroll;
