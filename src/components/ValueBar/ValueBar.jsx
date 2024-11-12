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
			image: '',
		},
		{
			title: t('Contact.Value.Title.1'),
			content: t('Contact.Value.Context.1'),
			image: '',
		}, //t("Contact.")
		{
			title: t('Contact.Value.Title.2'),
			content: t('Contact.Value.Context.2'),
			image: '',
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
							<img src='/ornek.jpg' alt='value-image' />
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
							<img src='/ornek.jpg' alt='value-image' />
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
							<img src='/ornek.jpg' alt='value-image' />
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
