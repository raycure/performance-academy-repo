import React from 'react';
import './News.css';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import NewsItem from '../../components/NewsItem/NewsItem';
function News() {
	return (
		<>
			<CustomCalendar />
			<div className='news-container'>
				<NewsItem />
			</div>
		</>
	);
}
export default News;
