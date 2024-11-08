import React, { useEffect, useLayoutEffect, useState } from 'react';
import name from '/ornek.jpg';
import { Link, useLocation } from 'react-router-dom';
import './ClassInfo.css';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { motion } from 'framer-motion';
import {
	upwardFill,
	accordion,
} from '../../components/animations/AnimationValues.jsx';
import { useTranslation } from 'react-i18next';
import EventList from '../../components/EventItem/EventList.jsx';
import { PiBarbell } from 'react-icons/pi';
function ClassInfo() {
	const { t, i18n } = useTranslation('translation');
	const location = useLocation();
	// this is the one i need from redux
	const programID = 'BODYSTEP';
	//location.state?.program;
	const program = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((program) => {
				return program.id === programID;
			});
		})
		.filter(Boolean)[0];

	const recPrograms = Object.values(LesmillsPrograms())
		.flat()
		.sort(() => 0.5 - Math.random())
		.slice(0, 3); //shuffles array and returns 3 random programs
	const [navbarHeight1, setnavbarHeight1] = useState(0);
	useLayoutEffect(() => {
		const navbar = document.querySelector('#navbar');
		const navbarHeight = navbar.offsetHeight;
		setnavbarHeight1(navbarHeight);
	}, []);
	if (!program) {
		return <p>Program not found</p>;
	}
	return (
		<>
			<div
				className='page-poster-container'
				style={{ paddingLeft: '5vw', flexDirection: 'column' }}
			>
				<img
					aria-label='program pic'
					className='background-image'
					style={{ opacity: 0.6 }}
					src={name}
				/>
				<p className='poster-heading'>{program.title}</p>
				<p className='fs-secondary-heading'>{program.result}</p>
			</div>
			<p className='class-info-sum'>{program.sum}</p>
			<section className='class-info-grid'>
				<img
					src='/ornek.jpg'
					alt='name'
					style={{ height: '100%', objectFit: 'cover', padding: '1rem 0rem' }}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
					}}
				>
					<p
						className='fs-minimal-heading fw-bold'
						style={{ padding: '0.5rem 0rem 0.7rem' }}
					>
						{program.title} Nedir?
					</p>
					<p>{program.description}</p>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<hr
							style={{
								width: '100%',
								alignSelf: 'center',
								margin: '0rem 1.5rem 0rem 0rem',
							}}
						/>
						<PiBarbell
							style={{
								display: 'inline-block',
								minWidth: '1.5rem',
								height: '100%',
							}}
						/>
						<hr
							style={{
								width: '100%',
								alignSelf: 'center',
								margin: '0rem 0rem 0rem 1.5rem',
							}}
						/>
					</div>
					<p>
						{i18n.language === 'tr' ? 'Türü' : 'Type'}: {program.type}
					</p>
					<p>
						{i18n.language === 'tr' ? 'Gerekli Ekipman' : 'Needed Equipment'}:{' '}
						{program.equipment}
					</p>
					<p>
						{i18n.language === 'tr' ? 'Kime Yönelik' : 'For'}: {program.for}
					</p>
				</div>
				<div style={{ textAlign: 'center' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<hr
							style={{
								width: '10%',
								alignSelf: 'center',
								margin: '0rem 1.5rem',
							}}
						/>
						<PiBarbell
							style={{
								display: 'inline-block',
								minWidth: '1.5rem',
								height: '100%',
							}}
						/>
						<hr
							style={{
								width: '10%',
								alignSelf: 'center',
								margin: '0rem 1.5rem',
							}}
						/>
					</div>
					<p
						className='fs-minimal-heading fw-bold'
						style={{ padding: '0.5rem 0rem 0.7rem' }}
					>
						Neden {program.title}?
					</p>
					{!program.why ? (
						<>
							{program.whyMember}
							<hr
								style={{
									width: '80%',
									border: 'none',
									borderTop: '0px solid #ccc',
									margin: '10px 0',
								}}
							/>
							{program.whyYou}
						</>
					) : (
						<>
							{program.sum}
							<hr
								style={{
									width: '80%',
									border: 'none',
									borderTop: '0px solid #ccc',
									margin: '10px 0',
								}}
							/>
							{program.why}
						</>
					)}
				</div>
				<img
					src='/ornek.jpg'
					alt='name'
					style={{ height: '100%', objectFit: 'cover', padding: '1rem 0rem' }}
				/>
			</section>
			<section>
				<video
					className='testVid'
					controls
					style={{ height: `calc(100dvh - ${navbarHeight1}px)` }}
				>
					<source src='' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</section>
			<p
				className='fs-minimal-heading center-item'
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginBottom: '3rem',
				}}
			>
				Etkinliklerimizden Birisine Katılarak
				<b className='fs-secondary-heading fw-bold'>{program.title}</b>
				Programının Sertifikalı Eğitmeni Olmak İster Misin?
			</p>
			<EventList
				activeProgram={programID}
				programTitle={program.title}
				infoActive={false}
			/>
			<ul className='class-rec-con'>
				{recPrograms.map((program, index) => {
					return (
						<motion.li
							initial='initial'
							whileHover='animate'
							key={index}
							className='class-rec-item relative-position'
						>
							<img
								src={name}
								alt={`rec-picture-${program.title}`}
								className='background-image'
							/>
							<motion.div
								variants={upwardFill}
								style={{ padding: '0.5rem' }}
								className='bg-primary-500 bg-primary-trnsp'
							>
								<p className='fw-bold'>{program.title}</p>
								<motion.p
									variants={accordion}
									className='fs-400 text-neutral-100'
								>
									{program.sum}
								</motion.p>
								<Link
									to={`/program#${program.id}`}
									state={{ program: program.id }}
									className='fs-400 text-neutral-100'
									onClick={() => {
										window.scrollTo({
											top: 0,
											left: 0,
											behavior: 'instant',
										});
									}}
								>
									İncele
								</Link>
							</motion.div>
						</motion.li>
					);
				})}
				<li
					className='bg-primary-300'
					style={{
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<p>Aradığınız başka bir program mı var?</p>
					<Link to='/programlar' className='fs-650'>
						Tüm Programları İncele
					</Link>
				</li>
			</ul>
		</>
	);
}
export default ClassInfo;
