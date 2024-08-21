import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css/effect-coverflow';
import EventItem from '../EventItem/EventItem';
import './Carousel.css';
export default () => {
	const eventItems = EventItem();

	return (
		<Swiper
			modules={[Pagination, EffectCoverflow]}
			spaceBetween={30}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
			autoplay={{ delay: 100 }}
			effect='coverflow'
			centeredSlides={true}
			grabCursor={true}
			loop={true}
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
				depth: 70,
				modifier: 3,
			}}
			slidesPerView={2.7}
		>
			{eventItems.map((event, index) => {
				//const backgroundPhoto = '';
				return (
					<SwiperSlide key={index}>
						{/* <img
							src={backgroundPhoto}
							alt='event photo'
							className='background-image card-carousel-event-background'
						/> */}
						<div className='card-carousel-event-container'>
							{event}
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};
