import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ClassInfo.css';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { useTranslation } from 'react-i18next';
import EventList from '../../components/EventItem/EventList.jsx';
import { PiBarbell } from 'react-icons/pi';
import { MdDoubleArrow } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../../redux/Slices/ProgramIdSlice.js';
import BynderEmbed from '../../components/BynderEmbed/BynderEmbed.jsx';
import { LesMillsEvents } from '../../assets/LesmillsEvents.jsx';
function ClassInfo() {
	const { t, i18n } = useTranslation('translation');
	const programID = useSelector((state) => state.selectedProgramId.id);
	let test;
	const today = new Date();
	useEffect(() => {
		console.log('programID', programID);
		const LessMillsevents = LesMillsEvents;
		test = LessMillsevents.filter((event) => {
			return event.program === programID && event.fullStartDate >= today;
		});
	}, []);

	useEffect(() => {
		console.log('test,', test);
	}, [test]);

	const program = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((program) => {
				return program.id === programID;
			});
		})
		.filter(Boolean)[0];

	const recPrograms = Object.values(LesmillsPrograms())
		.flat()
		.filter((prog) => {
			return prog.id !== program.id;
		})
		.sort(() => 0.5 - Math.random())
		.slice(0, 3); //shuffles array and returns 3 random programs

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSelectId = (id) => {
		dispatch(setId(id));
		navigate('/program');
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	};
	if (!program) {
		return (
			<p>
				{i18n.language === 'en' ? 'Program Not Found' : 'Program Bulunamadı'}
			</p>
		);
	}
	return (
		<div className='class-info-outer-con'>
			<div
				className='page-poster-container user-select-none'
				style={{ paddingInline: '5vw', flexDirection: 'column' }}
			>
				<img
					aria-label='program pic'
					className='background-image'
					style={{ opacity: 0.6 }}
					src={program.additionalPictures[0].url}
				/>
				<p className='poster-heading'>{program.title}</p>
				<p className='fs-minimal-heading'>{program.result}</p>
			</div>
			<section>
				<p className='class-info-sum'>{program.sum}</p>
				<section className='class-info-grid'>
					<img src={program.additionalPictures[1].url} alt='name' />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						}}
					>
						<div
							className='fs-minimal-heading fw-bold'
							style={{ padding: '0.5rem 0rem 0.7rem' }}
						>
							{i18n.language === 'en' ? (
								<p>What Is {program.title}?</p>
							) : (
								<p>{program.title} Nedir?</p>
							)}
						</div>
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
							{i18n.language === 'en' ? 'Why' : 'Neden'} {program.title}?
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
							<div style={{ fontSize: '0.9rem' }}>
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
							</div>
						)}
					</div>
					<img src={program.additionalPictures[3].url} alt='name' />
				</section>
				<BynderEmbed
					mediaId={program.mediaId}
					accountUrl='https://marketing.lesmills.com'
					language={i18n.language}
					autoplay={false}
				/>
				<section>
					<div
						className='fs-minimal-heading center-item'
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '1rem',
							marginBottom: '2rem',
						}}
					>
						<p style={{ textAlign: 'center' }}>
							{i18n.language === 'en'
								? 'Would You Like To Become a Certified'
								: 'Etkinliklerimizden Birisine Katılarak'}
						</p>
						<p className='fs-secondary-heading fw-bold'>{program.title}</p>
						<p style={{ textAlign: 'center' }}>
							{i18n.language === 'en'
								? 'Instructor by Joining One of Our Events?'
								: 'Programının Sertifikalı Eğitmeni Olmak İster Misin?'}
						</p>
					</div>
					<EventList activeProgram={programID} infoActive={false} />
				</section>
			</section>
			<section>
				<ul className='class-rec-con'>
					{recPrograms.map((program, index) => {
						return (
							<li key={index} className='class-rec-item relative-position'>
								<img
									src={program.additionalPictures[0].url}
									alt={`rec-picture-${program.title}`}
									className='background-image'
								/>
								<div
									style={{ padding: '0.5rem' }}
									className='bg-primary-trnsp rec-program-info'
								>
									<p className='fw-bold'>{program.title}</p>

									<div className='rec-program-sum'>
										<p className='fs-300 text-neutral-100'>{program.sum}</p>
									</div>
									<Link
										to={`/program#${program.id}`}
										state={{ program: program.id }}
										className='fs-400 text-neutral-100 more-link'
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.2rem',
										}}
										onClick={() => handleSelectId(program.id)}
									>
										{i18n.language === 'en' ? 'More' : 'İncele'}
										<MdDoubleArrow style={{ width: '1rem', height: '100%' }} />
									</Link>
								</div>
							</li>
						);
					})}
					<li
						className='bg-primary-350 all user-select-none'
						style={{
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0 1rem',
						}}
					>
						<p>
							{i18n.language === 'en'
								? 'Looking for Something Else'
								: 'Aradığınız başka bir program mı var'}
							?
						</p>
						<Link to='/programlar' className='fs-650'>
							{i18n.language === 'en' ? 'All Programs' : 'Tüm Programlar'}
						</Link>
					</li>
				</ul>
			</section>
		</div>
	);
}
export default ClassInfo;
