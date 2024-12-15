import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ValueBar.css';
import { Autoplay, Navigation } from 'swiper/modules';

function ValueBar() {
	const { i18n, t } = useTranslation('translation');
	const values = [
		{
			title: t('Contact.Value.Title.0'),
			content: t('Contact.Value.Context.0'),
			image:
				'https://d2csxpduxe849s.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6371B94B-BEFD-4E12-9835705B02D18A59/webimage-F29CD703-F397-4DCE-BB7CE146582915CD.png',
		},
		{
			title: t('Contact.Value.Title.1'),
			content: t('Contact.Value.Context.1'),
			image:
				'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A341677E-FE2B-497B-9A0A67005F175693/webimage-2233F2A9-772E-4D73-8B0396906A00E535.png',
		},
		{
			title: t('Contact.Value.Title.2'),
			content: t('Contact.Value.Context.2'),
			image:
				'https://d2csxpduxe849s.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/B2693275-DF4E-48AE-81BB42C8F32CB00A/webimage-12833637-C3EF-4619-8FA36DD9574C091A.png',
		},
	];
	return (
		<section className='value-bar'>
			<p
				className='fs-secondary-heading'
				style={{ fontWeight: 'bolder', textAlign: 'center', padding: '1.5rem' }}
			>
				{t('Contact.Value.Heading')}
			</p>
			<Swiper
				spaceBetween={20}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				slidesPerView={2}
				navigation={true}
				modules={[Autoplay, Navigation]}
				className='mySwiper'
				loop
			>
				{values.map((value, index) => {
					return (
						<SwiperSlide key={index} style={{}}>
							<img src={value.image} alt='value-image' />
							<p
								style={{
									fontWeight: 'bolder',
									fontSize: '1.3rem',
									margin: '0.8rem auto',
									marginBottom: '0.2rem',
									textAlign: 'center',
								}}
							>
								{value.title}
							</p>
							<p style={{ textAlign: 'center' }}>{value.content}</p>
						</SwiperSlide>
					);
				})}
				{values.map((value, index) => {
					return (
						<SwiperSlide key={index} style={{}}>
							<img src={value.image} alt='value-image' />
							<p
								style={{
									fontWeight: 'bolder',
									fontSize: '1.3rem',
									margin: '0.8rem auto',
									marginBottom: '0.2rem',
									textAlign: 'center',
								}}
							>
								{value.title}
							</p>
							<p style={{ textAlign: 'center' }}>{value.content}</p>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<ul className='value-outer-container'>
				{values.map((value, index) => {
					return (
						<li key={index} className='value-inner-container'>
							<img src={value.image} alt='value-image' />
							<p
								style={{
									fontWeight: 'bolder',
									fontSize: '1.3rem',
									margin: '0.8rem auto',
									marginBottom: '0.2rem',
									textAlign: 'center',
								}}
							>
								{value.title}
							</p>
							<p style={{ textAlign: 'center' }}>{value.content}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
export default ValueBar;
