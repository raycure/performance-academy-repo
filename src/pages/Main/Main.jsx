import React, { Fragment, useEffect, useLayoutEffect } from 'react';
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
import { CiGlobe } from 'react-icons/ci';
import { Gem } from 'lucide-react';
import { Calendar1 } from 'lucide-react';
import { useRef } from 'react';
import { ChartNoAxesCombined } from 'lucide-react';
import { Earth } from 'lucide-react';
import Banner from '../../components/Banner/Banner.jsx';

import FAQ from '../../components/FAQ/FAQ.jsx';
import testortheflamboyantimg from '../../assets/testortheflamboyantimg.png';
import logo from '../../assets/LesmillsLogo.png';

function Main() {
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
	const lesMillsPrograms = LesMillsPrograms();
	let navigate = useNavigate();
	function routeChange(category) {
		navigate('/programlar', { state: category });
	}
	const cards = Object.keys(lesMillsPrograms).map((category, index) => {
		const backContent = (
			<div
				key={index}
				className='card-inner-container'
				onClick={() => routeChange(category)}
			>
				<img
					src={
						category === 'GRUP FITNESS PROGRAMLARI'
							? '/ornek.jpg'
							: category === 'ÇOCUK VE GENÇ PROGRAMLARI'
							? '/ornek.jpg'
							: '/ornek.jpg'
					}
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
				<h1 className='detailText center-item'> click to see more</h1>
			</div>
		);
		const frontContent = (
			<div
				onClick={() => routeChange(category)}
				className='card-inner-container'
			>
				<h2 className='fs-650'>{category}</h2>
				<img
					src={
						category === 'GRUP FITNESS PROGRAMLARI'
							? '/ornek.jpg'
							: category === 'ÇOCUK VE GENÇ PROGRAMLARI'
							? '/ornek.jpg'
							: '/ornek.jpg'
					}
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

	async function deleteToken() {
		localStorage.removeItem('accessToken');
	}

	const scrollingImgRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: scrollingImgRef,
		offset: ['start end', ' end start'], // first start is the top of the element and the end is the end of the screen ['',''] first quates are when the animation starts and the second one is when it ends
	});

	const scrollWith = useTransform(scrollYProgress, [0.3, 0.632], [0, -250]); // [0,0.91] is how much its being scrolled .91 because of the header [0,-250] for the top attribute and it changes based on the 0 to 0.91
	return (
		<>
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
			<video
				className='fullSizedVid'
				controls
				style={{ height: `calc(100dvh - ${navbarHeight}px)` }}
			>
				<source src='path-to-your-video.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<Container className='even-columns '>
				<div>
					<div className='fs-primary-heading'>Lesmills Nedir?</div>
					<div className='fs-primary-heading' style={{ color: '#edfb06' }}>
						<span>Lesmills </span>
						<span>Eğitmeni Olun</span>
					</div>
					<p>
						İnsanlara hayatlarını değiştirmeleri için ilham vermeye ve motive
						etmeye hazır mısınız? İster yıllardır Eğitmenlik yapıyor olun, ister
						yolculuğunuza yeni başlıyor olun, Les Mills Eğitmeni olarak başarılı
						bir kariyer için ihtiyacınız olan her şeyi size vereceğiz.
						Programlarımızdan herhangi birinde Eğitmen olarak eğitim alın -
						seçim sizin!
					</p>
					<p>
						Lesmills farklı tarzlarda Grup Fitness Programları yapan dünyaca
						ünlü bir Eğitim Firmasıdır. Lesmills Programları 130 ülkede çoşkulu
						bir şekilde yapılmaktadır. Bir çok Eğitmen bu programlardan ilham
						alıp kendilerini dünya standarlarında star bir Eğitmen haline
						getirmişlerdir. Eğitimlere katıldığınız ve Sertifikanızı aldığınız
						taktirde Dünyanın her ülkesinde geçerli olan bu sertifika ile ders
						verebilirsiniz. O zaman bu eğitimlere nasıl katılabilir ve bu
						Sertifikayı nasıl alabilirsiniz? Sorusunu genel olarak bir gözden
						geçirelim.
					</p>
				</div>
				<img src={isim} className='image'></img>
			</Container>
			<div className='bannerLikeImageContainer' ref={scrollingImgRef}>
				<motion.div
					style={{
						top: scrollWith,
						position: 'absolute',
					}}
				>
					<img src={testortheflamboyantimg} />
				</motion.div>
			</div>
			{/* <div style={{ position: 'relative' }} id='testttt'>
				<img src={testortheflamboyantimg} style={{ top: testHeight1 }}></img>
				<span className='testspann' style={{ top: `${testHeight1}px` }}></span>
			</div> */}
			{/* //todo vidi gizle butonu */}
			<Banner />
			<h2 className='fs-primary-heading center-item'>
				Kategorilerimiz arasindan secim yapin
			</h2>
			<h2 className='fs-primary-heading center-item'>Yaklasan etkinlikler</h2>
			<div className='carousel-container'>
				<CardCarousel />
			</div>
			<h2 className='fs-primary-heading center-item'>Sikca sorulan Sorular</h2>
			<FAQ></FAQ>
			{/* <div className='btn-container center-item'>
				<a href='#' className='btn-shine'>
					LESMILLS
				</a>
			</div> */}
			<button onClick={handleSub}>
				{subSuccess ? (
					<p>Request was successful!</p>
				) : (
					<p>Click to submit request</p>
				)}
			</button>
			<br></br>
			<button onClick={deleteToken}> delete token</button>
			<br></br>
			<button onClick={handleLogout}>logout</button>
			<Container>
				<div className='fs-primary-heading center-item'>
					<img
						alt='Les Mills logo'
						className='logo'
						src={logo}
						style={{
							height: '3.5rem',
							width: 'auto',
							marginRight: '1rem',
							float: 'left',
						}}
					/>

					<span style={{ marginTop: '0.5rem' }}> Eğitmen Olun</span>
				</div>
				<div className='gridCardContainer'>
					<div className='gridCard'>
						<div className='gridCardHeading'>
							<Earth strokeWidth={1.25} className='cardIcon' />
							<h2 className='fs-minimal-heading'>Uluslararası Sertifikalar</h2>
						</div>
						<p>
							As a Les Mills certified instructor, you'll join an elite
							community of fitness professionals recognized in over 130
							countries worldwide. Our certification programs are the gold
							standard in group fitness education, trusted by leading health
							clubs and fitness facilities across six continents.
						</p>
						{/* Les Mills sertifikalı bir eğitmen olarak, dünya çapında 130'dan
							fazla ülkede tanınan seçkin bir fitness profesyonelleri
							topluluğuna katılacaksınız. Sertifika programlarımız, altı kıtada
							önde gelen sağlık kulüpleri ve fitness tesisleri tarafından
							güvenilen, grup fitness eğitiminde altın standarttır. */}
					</div>
					<div className='gridCard'>
						<div className='gridCardHeading'>
							<ChartNoAxesCombined className='cardIcon' />
							<h2 className='fs-minimal-heading'>Her Seviyeye uygun</h2>
						</div>
						<p>
							Regardless of your starting point, Les Mills certification is
							designed to be a journey of continuous growth. Regular workshops,
							quarterly program updates, and ongoing education opportunities
							ensure that both new and experienced instructors stay current with
							the latest developments in fitness science and teaching
							methodology.
						</p>
						{/* Başlangıç noktanız ne olursa olsun, Les Mills sertifikası sürekli
							bir gelişim yolculuğu olarak tasarlanmıştır. Düzenli atölye
							çalışmaları, üç ayda bir program güncellemeleri ve sürekli eğitim
							fırsatları, hem yeni hem de deneyimli eğitmenlerin fitness bilimi
							ve öğretim metodolojisindeki en son gelişmeleri takip etmelerini
							sağlar. */}
					</div>
					<div className='gridCard'>
						<div className='gridCardHeading'>
							<Gem className='cardIcon' strokeWidth={1.25} />
							<h2 className='fs-minimal-heading'>Geleceğe Yatırım</h2>
						</div>
						<p>
							When you choose a Les Mills certification, you're not just paying
							for a certificate – you're investing in a complete career toolkit
							that delivers real value from day one. Our certification costs
							reflect the comprehensive support, proven programs, and ongoing
							benefits that set Les Mills apart in the fitness industry.
						</p>
						{/* Bir Les Mills sertifikası seçtiğinizde, yalnızca bir sertifika
							için ödeme yapmıyorsunuz – ilk günden itibaren gerçek değer sunan
							eksiksiz bir kariyer araç setine yatırım yapıyorsunuz.
							Sertifikasyon maliyetlerimiz, Les Mills'i fitness sektöründe öne
							çıkaran kapsamlı destek, kanıtlanmış programlar ve sürekli
							sağlanan avantajları yansıtmaktadır. */}
					</div>
					<div className='gridCard'>
						<div className='gridCardHeading'>
							<Calendar1 className='cardIcon' strokeWidth={1.25} />
							<h2 className='fs-minimal-heading'>Exclusive Quarterly Events</h2>
						</div>
						<p>
							Get ready to elevate your Les Mills journey with exclusive
							quarterly events for certified instructors. Join us in-person or
							online for limited-time gatherings designed to enhance your skills
							and energize your teaching. Don't miss these special opportunities
							every three months.
						</p>
						{/* Les Mills deneyiminizi özel üç aylık etkinliklerimizle
							güçlendirmeye hazırlanın! Her üç ayda bir, yalnızca sertifikalı
							Les Mills eğitmenlerine özel, sınırlı süreli buluşmalar sunuyoruz.
							İster enerjik yüz yüze etkinliklerimize katılmayı tercih edin,
							ister dinamik çevrim içi deneyimlerimize erişin, bu etkinlikler
							becerilerinizi bir üst seviyeye taşımak için tasarlanmıştır. */}
					</div>
				</div>
			</Container>
			;
		</>
	);
}
export default Main;
