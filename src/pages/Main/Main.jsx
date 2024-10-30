// import React from 'react';
// import './Main.css';
// import Container from '../../components/Containers/Container';
// import isim from '/ornek.jpg';
// import testpng from '../../assets/test.png';
// import Card from '../../components/Cards/Card';
// import LesMillsPrograms from '../../assets/LesmillsPrograms';
// import CardCarousel from '../../components/Carousels/CardCarousel';
// import { color, motion } from 'framer-motion';
// import { downToUp } from '../../components/animations/AnimationValues.jsx';
// import Banner from '../../components/Banner/Banner';
// import { button } from '../../components/animations/AnimationValues.jsx';
// import { useState } from 'react';
// import axios from '../api/axios.js';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/LesmillsLogo.png';
// import Button from '../../components/Button/Button.jsx';

// function Main() {
// 	//todo delete it later
// 	async function handleLogout() {
// 		console.log({
// 			accessToken: localStorage.getItem('accessToken'),
// 		});
// 		const response = await axios.post('/logout', {
// 			withCredentials: true,
// 		});
// 		console.log(response);
// 		localStorage.removeItem('isLoggedIn');

// 		if (response.status === 200) {
// 			localStorage.removeItem('accessToken');
// 		}
// 	}

// 	const [subSuccess, setSubSuccess] = useState(false);
// 	const lesMillsPrograms = LesMillsPrograms();
// 	let navigate = useNavigate();
// 	function routeChange(category) {
// 		navigate('/programlar', { state: category });
// 	}

// 	async function sendVerifyMailTest() {}

// 	const cards = Object.keys(lesMillsPrograms).map((category, index) => {
// 		const backContent = (
// 			<div
// 				key={index}
// 				className='card-inner-container'
// 				onClick={() => routeChange(category)}
// 			>
// 				<img
// 					src={
// 						category === 'GRUP FITNESS PROGRAMLARI'
// 							? '/ornek.jpg'
// 							: category === 'ÇOCUK VE GENÇ PROGRAMLARI'
// 							? '/ornek.jpg'
// 							: '/ornek.jpg'
// 					}
// 					alt='events page hero'
// 					className='background-image opacity-low'
// 				/>
// 				{lesMillsPrograms[category].map((program, subindex) => (
// 					<>
// 						<p key={subindex}>{program.title}</p>
// 						<hr />
// 						{program.subTitles &&
// 							program.subTitles.map((subtitle, subindex) => (
// 								<>
// 									<p key={subindex + subindex}>{subtitle}</p>
// 									<hr className='opacity-low' />
// 								</>
// 							))}
// 					</>
// 				))}
// 			</div>
// 		);
// 		const frontContent = (
// 			<div
// 				onClick={() => routeChange(category)}
// 				className='card-inner-container'
// 			>
// 				<h2 className='fs-650'>{category}</h2>
// 				<img
// 					src={
// 						category === 'GRUP FITNESS PROGRAMLARI'
// 							? '/ornek.jpg'
// 							: category === 'ÇOCUK VE GENÇ PROGRAMLARI'
// 							? '/ornek.jpg'
// 							: '/ornek.jpg'
// 					}
// 					alt='events page hero'
// 					className='background-image opacity-low'
// 				/>
// 			</div>
// 		);
// 		return (
// 			<motion.div
// 				key={index}
// 				variants={downToUp}
// 				viewport={{ once: true }}
// 				custom={index}
// 			>
// 				<Card backContent={backContent} frontContent={frontContent} />
// 			</motion.div>
// 		);
// 	});
// 	async function handleSub() {
// 		try {
// 			const accessToken = localStorage.getItem('accessToken');
// 			const response = await axios.get('/test', {
// 				withCredentials: true,
// 				headers: { Authorization: `Bearer ${accessToken}` },
// 			});
// 			console.log('response login.jsx: ', response);
// 			setSubSuccess(true);
// 		} catch (err) {
// 			console.log(err);

// 			if (err?.response?.status === 401 || err?.response?.status === 403) {
// 				console.log(
// 					'Token expired or unauthorized, attempting to refresh token...'
// 				);
// 				const refreshResponse = await axios.get('/refresh', {
// 					withCredentials: true,
// 				});
// 				const newAccessToken = refreshResponse.data.accessToken;
// 				localStorage.setItem('accessToken', newAccessToken);
// 				const response = await axios.get('/test', {
// 					withCredentials: true,
// 					headers: { Authorization: `Bearer ${newAccessToken}` },
// 				});
// 				setSubSuccess(true);
// 			}
// 		}
// 	}

// 	async function deleteToken() {
// 		localStorage.removeItem('accessToken');
// 	}

// 	return (
// 		<>
// 			<button onClick={handleSub}>
// 				{subSuccess ? (
// 					<p>Request was successful!</p>
// 				) : (
// 					<p>Click to submit request</p>
// 				)}
// 			</button>
// 			<br></br>
// 			<button onClick={deleteToken}> delete token</button>
// 			<br></br>
// 			<button onClick={handleLogout}>logout</button>
// 			{/* <Banner /> */}
// 			<Container className='even-columns bottom-space'>
// 				<div>
// 					{/* <div className="fs-primary-heading">Lesmills Nedir?</div> */}
// 					<div className='fs-primary-heading' style={{ color: '#edfb06' }}>
// 						{' '}
// 						<span>Lesmills </span>
// 						Eğitmeni Olun
// 					</div>
// 					<div className='fs-primary-heading' style={{ color: '#d5fb02' }}>
// 						{' '}
// 						<span>Lesmills </span>
// 						Eğitmeni Olun
// 					</div>
// 					<div className='fs-primary-heading' style={{ color: '#f20c0e' }}>
// 						{' '}
// 						<span>Lesmills </span>
// 						Eğitmeni Olun
// 					</div>
// 					<Button styleProp={{ backgroundColor: '#0cf246' }}></Button>

// 					<p>
// 						İnsanlara hayatlarını değiştirmeleri için ilham vermeye ve motive
// 						etmeye hazır mısınız? İster yıllardır Eğitmenlik yapıyor olun, ister
// 						yolculuğunuza yeni başlıyor olun, Les Mills Eğitmeni olarak başarılı
// 						bir kariyer için ihtiyacınız olan her şeyi size vereceğiz.
// 						Programlarımızdan herhangi birinde Eğitmen olarak eğitim alın -
// 						seçim sizin!
// 					</p>
// 					<p>
// 						Lesmills farklı tarzlarda Grup Fitness Programları yapan dünyaca
// 						ünlü bir Eğitim Firmasıdır. Lesmills Programları 130 ülkede çoşkulu
// 						bir şekilde yapılmaktadır. Bir çok Eğitmen bu programlardan ilham
// 						alıp kendilerini dünya standarlarında star bir Eğitmen haline
// 						getirmişlerdir. Eğitimlere katıldığınız ve Sertifikanızı aldığınız
// 						taktirde Dünyanın her ülkesinde geçerli olan bu sertifika ile ders
// 						verebilirsiniz. O zaman bu eğitimlere nasıl katılabilir ve bu
// 						Sertifikayı nasıl alabilirsiniz? Sorusunu genel olarak bir gözden
// 						geçirelim.
// 					</p>
// 				</div>
// 				<img src={isim} className='image'></img>
// 			</Container>
// 			<Container className='even-columns cardContent' style={{ gap: '0px' }}>
// 				{cards}
// 			</Container>
// 			<div className='carousel-container'>
// 				<CardCarousel />
// 			</div>
// 			{/* <Container>
//         <video width="100%" controls >
//           <source src="path-to-your-video.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </Container> */}
// 			<div className='btn-container center-item'>
// 				{' '}
// 				<a href='#' className='btn-shine'>
// 					LESMILLS
// 				</a>
// 			</div>
// 			<div className='test1 testt'>yeni test1 primary100</div>
// 			<div className='test2 testt'>eski test2 accent100</div>
// 			{/* <div
// 				data-bynder-widget='media-item'
// 				data-media-id='F388D152-22E8-4573-87DCAB935AE92BC5'
// 				data-title='true'
// 				data-lightbox='false'
// 				data-download='false'
// 			>
// 				<script
// 					id='bynder-widgets-js'
// 					data-account-url='marketing.lesmills.com'
// 					data-language='en'
// 					src='https://d8ejoa1fys2rk.cloudfront.net/bynder-embed/latest/bynder-embed.js'
// 				></script>
// 			</div> */}
// 			<img
// 				src='https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/365BF308-3E09-40C9-9E35204A3A883A48/webimage-50c1fbd9-ccb1-4d99-82a8-7eabb7af94fa.png'
// 				alt='new'
// 				style={{ width: '800px', height: '534px' }}
// 			/>
// 			<img src={testpng} style={{ width: '800px', height: '534px' }}></img>
// 			<img
// 				src='https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/28450439-B469-451F-8F633E972D823586/webimage-FBCCFCFD-E733-490C-8651079FBD8C2A60.png'
// 				style={{ width: '800px', height: '534px' }}
// 			></img>
// 			<div
// 				data-bynder-widget='media-item'
// 				data-media-id='28450439-B469-451F-8F633E972D823586'
// 				data-title='false'
// 				style={{ width: '800px', height: '534px' }}
// 				data-lightbox='false'
// 				data-download='false'
// 			>
// 				<script
// 					id='bynder-widgets-js'
// 					data-account-url='marketing.lesmills.com'
// 					data-language='en'
// 					src='https://d8ejoa1fys2rk.cloudfront.net/bynder-embed/latest/bynder-embed.js'
// 				></script>
// 			</div>
// 		</>
// 	);
// }
// export default Main;
import React, { useEffect, useState } from 'react';
import './Main.css';
import Container from '../../components/Containers/Container';
import isim from '/ornek.jpg';
import testpng from '../../assets/test.png';
import Card from '../../components/Cards/Card';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import CardCarousel from '../../components/Carousels/CardCarousel';
import { motion } from 'framer-motion';
import { downToUp } from '../../components/animations/AnimationValues.jsx';
import Button from '../../components/Button/Button.jsx';
import axios from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import FAQ from '../../components/FAQ/FAQ.jsx';

function Main() {
	const [subSuccess, setSubSuccess] = useState(false);
	const lesMillsPrograms = LesMillsPrograms();
	let navigate = useNavigate();

	useEffect(() => {
		const script = document.createElement('script');
		script.id = 'bynder-widgets-js';
		script.src =
			'https://d8ejoa1fys2rk.cloudfront.net/bynder-embed/latest/bynder-embed.js';
		script.setAttribute('data-account-url', 'marketing.lesmills.com');
		script.setAttribute('data-language', 'en');
		document.body.appendChild(script);

		// Cleanup function
		return () => {
			document.body.removeChild(script);
		};
	}, []);

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
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image opacity-low'
				/>
				{lesMillsPrograms[category].map((program, subindex) => (
					<div key={subindex}>
						<p>{program.title}</p>
						<hr />
						{program.subTitles &&
							program.subTitles.map((subtitle, subsubindex) => (
								<div key={subsubindex}>
									<p>{subtitle}</p>
									<hr className='opacity-low' />
								</div>
							))}
					</div>
				))}
			</div>
		);

		const frontContent = (
			<div
				onClick={() => routeChange(category)}
				className='card-inner-container'
			>
				<h2 className='fs-650'>{category}</h2>
				<img
					src='/ornek.jpg'
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
			>
				<Card backContent={backContent} frontContent={frontContent} />
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

	async function handleLogout() {
		const response = await axios.post('/logout', { withCredentials: true });
		console.log(response);
		localStorage.removeItem('isLoggedIn');
		if (response.status === 200) {
			localStorage.removeItem('accessToken');
		}
	}

	return (
		<>
			<button onClick={handleSub}>
				{subSuccess ? (
					<p>Request was successful!</p>
				) : (
					<p>Click to submit request</p>
				)}
			</button>
			<br />
			<button onClick={() => localStorage.removeItem('accessToken')}>
				Delete token
			</button>
			<br />
			<button onClick={handleLogout}>Logout</button>

			<Container className='even-columns bottom-space'>
				<div>
					<div className='fs-primary-heading' style={{ color: '#edfb06' }}>
						<span>Lesmills </span>Eğitmeni Olun
					</div>
					<p>
						İnsanlara hayatlarını değiştirmeleri için ilham vermeye ve motive
						etmeye hazır mısınız? İster yıllardır Eğitmenlik yapıyor olun, ister
						yolculuğunuza yeni başlıyor olun, Les Mills Eğitmeni olarak başarılı
						bir kariyer için ihtiyacınız olan her şeyi size vereceğiz.
					</p>
				</div>
				<img src={isim} alt='Sample' className='image' />
			</Container>

			<Container className='even-columns cardContent' style={{ gap: '0px' }}>
				{cards}
			</Container>

			<div className='carousel-container'>
				<CardCarousel />
			</div>

			<div className='btn-container center-item'>
				<a href='#' className='btn-shine'>
					LESMILLS
				</a>
			</div>

			<div style={{ width: '800px', height: '534px', position: 'relative' }}>
				<img
					src={testpng}
					alt='test'
					style={{ position: 'absolute', zIndex: -1 }}
				/>
				<span style={{ position: 'absolute', top: 20, left: 20, color: 'red' }}>
					original
				</span>
			</div>

			<div style={{ width: '800px', height: '534px', position: 'relative' }}>
				<img
					src='https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/28450439-B469-451F-8F633E972D823586/webimage-FBCCFCFD-E733-490C-8651079FBD8C2A60.png'
					alt='Bynder Media'
					style={{ position: 'absolute', zIndex: -1 }}
				/>
				<span
					style={{
						position: 'absolute',
						top: 20,
						left: 20,
						color: 'red',
						zIndex: 124124,
					}}
				>
					linked
				</span>
			</div>
			<div
				data-bynder-widget='media-item'
				data-media-id='28450439-B469-451F-8F633E972D823586'
				data-title='false'
				style={{
					width: '800px',
					height: '534px',
					position: 'relative',
					zIndex: -1,
				}}
				data-lightbox='false'
				data-download='false'
			></div>
			<span>the last one is embedded </span>
		</>
	);
}

export default Main;
