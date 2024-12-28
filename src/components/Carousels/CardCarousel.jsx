import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import EventItem from '../EventItem/EventItem';
import './Carousel.css';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
export default () => {
	const windowWidth = window.innerWidth;
	const slideAmount =
		windowWidth > 1550
			? 4
			: windowWidth > 1020
			? 3
			: windowWidth > 580
			? 2
			: 1.5;
	const today = new Date();
	return (
		<Swiper
			modules={[Pagination, Autoplay, EffectCoverflow]}
			spaceBetween={30}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			// onSlideChange={() => console.log('slide change')}
			// onSwiper={(swiper) => console.log(swiper)}
			autoplay={{ delay: 10000, disableOnInteraction: true }}
			effect='coverflow'
			centeredSlides={true}
			grabCursor={true}
			loop={true}
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
			}}
			slidesPerView={slideAmount}
		>
			{LesMillsEvents.filter((event) => {
				return event.fullStartDate >= today; //event.fullStartDate <= dateTwentyDaysAfter &&
			})
				.splice(0, 8)
				.map((event, index) => {
					const programPic = Object.keys(LesmillsPrograms())
						.map((category) => {
							return LesmillsPrograms()[category].find((program) => {
								return program.id === event.program;
							});
						})
						.find((program) => program !== undefined).additionalPictures[2].url;
					return (
						<SwiperSlide key={index}>
							<div className='card-carousel-event-container'>
								<img
									src={programPic}
									alt='event photo'
									className='background-image card-carousel-event-background'
								/>
								<EventItem event={event} />
							</div>
						</SwiperSlide>
					);
				})}
		</Swiper>
	);
};
