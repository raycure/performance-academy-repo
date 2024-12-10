import React, { act, Fragment, useEffect, useLayoutEffect } from 'react';
import './Main.css';
import Container from '../../components/Containers/Container';
import isim from '/ornek.jpg';
import Card from '../../components/Cards/Card';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import CardCarousel from '../../components/Carousels/CardCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';
import { downToUp } from '../../components/animations/AnimationValues.jsx';
import { useState } from 'react';
import axios from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import Banner from '../../components/Banner/Banner.jsx';
import FAQ from '../../components/FAQ/FAQ.jsx';
import testortheflamboyantimg from '../../assets/testortheflamboyantimg.png';

import { useTranslation } from 'react-i18next';
import CertificationSteps from '../../components/CertificationSteps/CertificationSteps.jsx';
import BecomeInstructorCards from '../../components/BecomeInstructorCards/BecomeInstructorCards.jsx';
import Button from '../../components/Button/Button.jsx';
import { AuthService } from '../../auth/auth.service.js';
import { useDispatch } from 'react-redux';

function Main() {
	const dispatch = useDispatch();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	//todo delete it later

	async function handleLogout() {
		console.log({
			accessToken: localStorage.getItem('accessToken'),
		});
		const response = await axios.post('/logout', {
			withCredentials: true,
		});
		console.log(response);
		localStorage.removeItem('isLoggedIn');

		if (response.status === 200) {
			localStorage.removeItem('accessToken');
		}
	}

	const [navbarHeight, setnavbarHeight] = useState(0);
	useLayoutEffect(() => {
		const header = document.querySelector('#navbar');
		const headerHeight = header.offsetHeight;
		setnavbarHeight(headerHeight);
	}, []);

	// const [testHeight1, settestHeight] = useState(0);
	// useEffect(() => {
	// 	const test = document.querySelector('#testttt');
	// 	const testHeight = test.offsetHeight;
	// 	settestHeight(testHeight - 300);
	// }, []);

	const [subSuccess, setSubSuccess] = useState(false);
	const [ipAddress, setIpAddress] = useState();
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
						{/* If you want to pass key to a Fragment, you can’t use the <>...</> syntax. You have to explicitly import Fragment from 'react' and render <Fragment key={yourKey}>...</Fragment>. thats why we are using Fragment here */}
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
	async function handleSub() {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await axios.get('/test', {
				withCredentials: true,
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			console.log('response login.jsx: ', response);
			setSubSuccess(true);
		} catch (err) {
			console.log(err);

			if (err?.response?.status === 401 || err?.response?.status === 403) {
				console.log(
					'Token expired or unauthorized, attempting to refresh token...'
				);
				const refreshResponse = await axios.get('/refresh', {
					withCredentials: true,
				});
				const newAccessToken = refreshResponse.data.accessToken;
				localStorage.setItem('accessToken', newAccessToken);
				const response = await axios.get('/test', {
					withCredentials: true,
					headers: { Authorization: `Bearer ${newAccessToken}` },
				});
				setSubSuccess(true);
			}
		}
	}

	const scrollingImgRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: scrollingImgRef,
		offset: ['start end', ' end start'], // first start is the top of the element and the end is the end of the screen ['',''] first quates are when the animation starts and the second one is when it ends
	});
	async function testPayment() {
		const programId = selectedEvent.title;
		const response = await dispatch(
			AuthService({
				data: { id: programId },
				method: 'POST',
				endpoint: '/pay',
			})
		);
		const paymentUrl = response.payload.data.url;
		if (paymentUrl) {
			window.location = paymentUrl;
		}
		console.log('response');
	}

	async function handleIpBlockReq(e) {
		e.preventDefault();
		try {
			const response = await dispatch(
				AuthService({
					data: { ip: ipAddress },
					method: 'POST',
					endpoint: '/blockIp',
				})
			);
		} catch (error) {
			console.log(error);
		}
	}

	async function testpurchases() {
		const response = await dispatch(
			AuthService({
				data: {},
				method: 'GET',
				endpoint: '/pay',
			})
		);
		console.log('response for testpurchases ', response);
	}

	const scrollWith = useTransform(scrollYProgress, [0.3, 0.632], [0, -250]); // [0,0.91] is how much its being scrolled .91 because of the header [0,-250] for the top attribute and it changes based on the 0 to 0.91
	return (
		<>
			<button onClick={testpurchases}> fsajdsa</button>

			<form onSubmit={handleIpBlockReq}>
				<input
					onChange={(e) => setIpAddress(e.target.value)}
					value={ipAddress}
					required
					type='text'
				/>
				<Button type='submit'>
					{i18n.language === 'en' ? 'Send' : 'Gönder'}
				</Button>
			</form>
			<button onClick={handleSub}>
				{subSuccess ? (
					<p>Request was successful!</p>
				) : (
					<p>Click to submit request</p>
				)}
			</button>
			<br></br>
			<button onClick={handleLogout}>logout</button>
			<div className='main-welcome-text-outer-con'>
				<div className='main-welcome-text-inner-con'>
					<div className='fs-primary-heading'>
						{i18n.language === 'en' ? "What's Lesmills?" : 'Lesmills Nedir?'}
					</div>
					<div className='fs-primary-heading' style={{ color: '#edfb06' }}>
						{i18n.language === 'en' ? 'Become a' : 'Lesmills'} <wbr />
						{i18n.language === 'en' ? 'Lesmills Instructor' : 'Eğitmeni Olun'}
					</div>
					<p>{t('MainPage.WelcomeText')}</p>
				</div>
				<img src={isim} className='image' />
			</div>
			<section>
				<video
					className='fullSizedVid'
					controls
					style={{ height: `calc(100dvh - ${navbarHeight}px)` }}
				>
					<source src='path-to-your-video.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</section>
			<Container className='landingPageContainer'>
				<div className='landingParagraph'>
					<h2 className='fs-secondary-heading'>Performance Fitness Academy</h2>
					<p className='fs-650 paragraph'>{t('MainPage.LandingParagraph.0')}</p>
					<p className='fs-400 paragraph'>{t('MainPage.LandingParagraph.1')}</p>
				</div>
				<div>
					<ul className='milestones'>
						<h4>milestones</h4>
						<li>SCIENCE-BASED APPROACH</li>
						<li>comprehensive resources</li>
						<li>globally respected certification</li>
						<li>in-person and online events</li>
						<li>vibrant active Lesmills' community</li>
						<li>for everyone</li>
						<li>easy process</li>
						<li>valuable</li>
					</ul>
				</div>
			</Container>
			<Banner />

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
						gap:
							// windowWidth < 1130 ? '30px' : windowWidth < 768 ? '20px' : '10px',
							windowWidth > 1110 ? '30px' : '10px',
					}}
					className='even-columns cardContent'
				>
					{cards}
				</Container>
			</section>

			<section className='bannerLikeImageContainer' ref={scrollingImgRef}>
				<motion.div
					style={{
						top: scrollWith,
						position: 'absolute',
					}}
				>
					<img src={testortheflamboyantimg} />
				</motion.div>
			</section>
			{/* <div style={{ position: 'relative' }} id='testttt'>
				<img src={testortheflamboyantimg} style={{ top: testHeight1 }}></img>
				<span className='testspann' style={{ top: `${testHeight1}px` }}></span>
			</div> */}
			{/* //todo vidi gizle butonu */}

			<BecomeInstructorCards />
			<section>
				<h2
					className='fs-primary-heading center-item'
					style={{ margin: '2rem auto' }}
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
			{/* <div className='btn-container center-item'>
				<a href='#' className='btn-shine'>
					LESMILLS
				</a>
			</div> */}
		</>
	);
}
export default Main;
