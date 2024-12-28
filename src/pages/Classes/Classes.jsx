import React, { useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { motion } from 'framer-motion';
import { backgroundFill } from '../../components/animations/AnimationValues';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import classesCarousel1 from '../../assets/classesCarousel1.png';
import classesCarousel2 from '../../assets/classesCarousel2.jpg';
import classesCarousel3 from '../../assets/classesCarousel3.png';
import classesCarousel4 from '../../assets/classesCarousel4.png';

function Classes() {
	const location = useLocation();
	const { t, i18n } = useTranslation('programs');
	const [classType, setClassType] = useState(
		location.state ? location.state : 'all'
	);
	function classSelectHandler(newClassType) {
		setClassType(newClassType);
	}
	const heroCarouselPics = [
		classesCarousel3,
		classesCarousel2,
		classesCarousel1,
		classesCarousel4,
	];

	const programNames = [
		{
			label: t('cat4'),
			selector: 'all',
		},
		{
			label: t('cat1.title'),
			selector: t('cat1.title'),
		},
		{
			label: t('cat2.title'),
			selector: t('cat2.title'),
		},
		{
			label: t('cat3.title'),
			selector: t('cat3.title'),
		},
	];
	return (
		<div className='class-outer-container'>
			<div className='page-poster-container user-select-none'>
				<img
					src={backgroundText}
					alt='events page hero'
					style={{
						position: 'relative',
						alignSelf: 'center',
						height: '55%',
						maxHeight: '50vw',
					}}
				/>
				<Swiper
					modules={[Autoplay]}
					spaceBetween={0}
					scrollbar={{ draggable: false }}
					autoplay={{ delay: 4000, disableOnInteraction: true }}
					centeredSlides={true}
					grabCursor={false}
					loop={true}
					slidesPerView={1}
					className='background-swiper'
				>
					{heroCarouselPics.map((img, index) => {
						return (
							<SwiperSlide key={index}>
								<img
									className='background-swiper-img'
									src={img}
									alt='hero picture'
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>

			<ul className='class-selector-bar user-select-none '>
				{programNames.map((program, index) => {
					return (
						<motion.li
							initial='initial'
							whileHover='animate'
							className='class-selector-item relative-position'
							onClick={() => classSelectHandler(program.selector)}
							key={index}
							style={
								classType === program.selector && {
									backgroundColor: 'white',
									color: 'black',
								}
							}
						>
							<motion.div
								variants={backgroundFill}
								className='class-selector-background'
								style={{
									backgroundColor: 'white',
								}}
							/>
							{program.label}
						</motion.li>
					);
				})}
			</ul>
			<ClassList classType={classType} />
		</div>
	);
}
export default Classes;
