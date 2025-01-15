import React, { act, Fragment, useEffect, useLayoutEffect } from 'react';
import './Main.css';
import Container from '../../components/Containers/Container';
import Card from '../../components/Cards/Card';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import CardCarousel from '../../components/Carousels/CardCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';
import { downToUp } from '../../components/animations/AnimationValues.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Banner from '../../components/Banner/Banner.jsx';
import FAQ from '../../components/FAQ/FAQ.jsx';
import { useTranslation } from 'react-i18next';
import BecomeInstructorCards from '../../components/BecomeInstructorCards/BecomeInstructorCards.jsx';
import { useDispatch } from 'react-redux';
import MilestoneCards from '../../components/Cards/MilestoneCards.jsx';
import landingVideo from '../../assets/videos/landing.mp4';

function Main() {
	const dispatch = useDispatch();
	// async function deleteCollections() {
	// 	const response = await dispatch(
	// 		AuthService({
	// 			method: 'POST',
	// 			endpoint: '/deleteCollections',
	// 		})
	// 	);
	// }
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const [navbarHeight, setnavbarHeight] = useState(0);
	useLayoutEffect(() => {
		const header = document.querySelector('#navbar');
		const headerHeight = header.offsetHeight;
		setnavbarHeight(headerHeight);
	}, []);

	const lesMillsPrograms = LesMillsPrograms();
	let navigate = useNavigate();
	function routeChange(category) {
		navigate('/programlar', { state: category });
	}
	const { i18n, t } = useTranslation('translation');
	const cards = Object.keys(lesMillsPrograms).map((category, index) => {
		const backContent = (
			<div
				key={index}
				className='card-inner-container'
				onClick={() => routeChange(category)}
			>
				<img
					src={lesMillsPrograms[category][0].additionalPictures[2].url}
					alt='events page hero'
					className='background-image opacity-low'
				/>
				{lesMillsPrograms[category].map((program, programIndex) => (
					<Fragment key={programIndex}>
						{/* If you want to pass `key to a Fragment, you can’t use the <>...</> syntax. You have to explicitly import Fragment from 'react' and render <Fragment key={yourKey}>...</Fragment>. thats why we are using Fragment here */}
						<p>{program.title}</p>
						<hr />
						{program.subTitles &&
							program.subTitles.map((subtitle, subtitleIndex) => (
								<Fragment key={`${programIndex}-${subtitleIndex}`}>
									<p>{subtitle}</p>
									<hr className='opacity-low' />
								</Fragment>
							))}
					</Fragment>
				))}
				<h1 className='detailText center-item'>
					{i18n.language === 'en'
						? 'Click to see more'
						: 'Daha fazla bilgi için tıklayınız'}
				</h1>
			</div>
		);
		const frontContent = (
			<div
				onClick={() => routeChange(category)}
				className='card-inner-container'
			>
				<h2 className='fs-650'>{category}</h2>
				<img
					src={lesMillsPrograms[category][0].additionalPictures[3].url}
					alt='events page hero'
					className='background-image opacity-low'
				/>
			</div>
		);
		return (
			<motion.div
				key={index}
				variants={downToUp}
				viewport={{ once: true }}
				custom={index}
				style={{ cursor: 'pointer' }}
			>
				<Card backContent={backContent} frontContent={frontContent}></Card>
			</motion.div>
		);
	});

	// const scrollingImgRef = useRef(null);
	// const { scrollYProgress } = useScroll({
	// 	target: scrollingImgRef,
	// 	offset: ['start end', ' end start'], // first start is the top of the element and the end is the end of the screen ['',''] first quates are when the animation starts and the second one is when it ends
	// });
	// const scrollWith = useTransform(scrollYProgress, [0.3, 0.632], [0, -250]); // [0,0.91] is how much its being scrolled .91 because of the header [0,-250] for the top attribute and it changes based on the 0 to 0.91
	return (
		<>
			{/* <button onClick={deleteCollections}>delete collectiosn</button> */}
			<video
				className='fullSizedVid'
				controls
				muted
				autoPlay
				loop
				controlsList='nodownload,noremoteplayback'
				style={{ maxHeight: `calc(100dvh - ${navbarHeight}px)` }}
			>
				<source src={landingVideo} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<section>
				<Container className='landingPageContainer'>
					<div className='landingParagraph'>
						<h2 className='fs-secondary-heading'>
							Performance Fitness Academy
						</h2>
						<p className='fs-650 paragraph'>
							{t('MainPage.LandingParagraph.0')}
						</p>
						<p className='fs-400 paragraph'>
							{t('MainPage.LandingParagraph.1')}
						</p>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<MilestoneCards />
					</div>
				</Container>
			</section>
			<section className='main-welcome-text-outer-con'>
				<h1>Les Mills</h1>
				<p style={{ paddingInline: '0.5rem' }}>{t('MainPage.WelcomeText')}</p>
			</section>
			<BecomeInstructorCards />
			<section>
				<h2
					className='fs-primary-heading center-item'
					id='cards-title'
					style={{ margin: '2rem auto' }}
				>
					{t('MainPage.CardsTitle')}
				</h2>
				<Container
					styleProp={{
						gap: windowWidth > 1110 ? '30px' : '10px',
					}}
					className='even-columns cardContent'
				>
					{cards}
				</Container>
			</section>
			{/* <section className='bannerLikeImageContainer' ref={scrollingImgRef}>
				<motion.div
					style={{
						top: scrollWith,
						position: 'absolute',
						width: '100%',
					}}
				>
					<img
						style={{ width: '100%' }}
						src='https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6DBF26B1-EAD1-41E8-87F578CFA9C6CC13/webimage-DB1F8A58-633C-4C11-98798C96D669CA94.jpg'
					/>
				</motion.div>
			</section> */}
			<Banner />
			<section className='event-carousel-outer-con'>
				<h2
					className='fs-primary-heading center-item'
					style={{ margin: '2rem auto', textAlign: 'center' }}
				>
					{i18n.language === 'en'
						? 'Our Upcoming Events'
						: 'Yaklaşan Etkinliklerimiz'}
				</h2>
				<div className='carousel-container'>
					<CardCarousel />
				</div>
			</section>
			<FAQ />
		</>
	);
}
export default Main;
