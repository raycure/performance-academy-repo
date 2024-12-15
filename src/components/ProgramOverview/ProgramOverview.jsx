import React, { useEffect } from 'react';
import './ProgramOverview.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { FiMoreHorizontal } from 'react-icons/fi';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { FaRegClock } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { IoMdCloudDownload } from 'react-icons/io';
function ProgramOverview({ eventID }) {
	const { i18n, t } = useTranslation('translation');
	const activeEvent = LesMillsEvents.find((event) => {
		return event.id === eventID;
	});
	useEffect(() => {
		console.log('activeEvent', activeEvent);
	}, []);
	useEffect(() => {
		console.log('program', program);
	}, []);

	const program = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((program) => {
				return program.id === activeEvent.title;
			});
		})
		.filter(Boolean)[0];

	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
		const navbar = document.querySelector('#navbar');
		const navbarHeight = navbar.offsetHeight;
		const yOffset = -navbarHeight;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};
	const lessonLength = extractNumbersFromString(program.lessons);
	const handlePlaylistDowload = () => {};
	const handleBookletDowload = () => {};
	const handleChoreographyDowload = () => {};
	const handleExamDowload = () => {};
	const buttonContent = [
		{
			text:
				i18n.language === 'en'
					? 'Choreography Booklet'
					: 'Koreografi Kitapçığı',
			function: handleChoreographyDowload,
		},
		{
			text: i18n.language === 'en' ? 'Program Booklet' : 'Program Kitapçığı',
			function: handleBookletDowload,
		},
		{
			text:
				i18n.language === 'en'
					? 'Choreography Playlist'
					: 'Koreografi Şarkıları',
			function: handlePlaylistDowload,
		},
		{
			text: i18n.language === 'en' ? 'Exam Form' : 'Sınav Formu',
			function: handleExamDowload,
		},
	];
	function extractNumbersFromString(text) {
		const numbers = text.match(/\d+/g);
		return numbers ? numbers.join(', ') : ''; //if numbers? then join them w commas in betten
	}

	function formatKeywords(text) {
		const keywords = ['Sanal', 'Canlı', 'Onsite', 'Online'];
		const found = keywords.filter((word) =>
			text.toLowerCase().includes(word.toLowerCase())
		);

		if (found.length > 1) {
			return found.join(i18n.language === 'en' ? ' and ' : ' ve ');
		}
		return found.length === 1 ? found[0] : ''; // Return the single word or an empty string
	}

	return (
		<div className='prog-overview-outer-con text-container' id={eventID}>
			<video controls style={{ width: '100%' }}>
				<source src='' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<div className='relative-position bg-primary-400 prog-overview-info-con'>
				<p
					className='fs-650'
					style={{ textAlign: 'center', fontWeight: 'bolder' }}
				>
					{program.title}
				</p>
				<div className='prog-overview-sum'>
					<span>
						<FaRegClock className='prog-overview-icon' />
						<p className='fw-bold' style={{ display: 'flex', gap: '0.5rem' }}>
							{lessonLength}
							<span
								style={{ position: 'relative', top: '3px' }}
								className='fs-300'
							>
								{i18n.language === 'en' ? ' min' : ' dk'}
							</span>
						</p>
						<p className='fs-400 text-primary-100'>
							{i18n.language === 'en' ? 'How Long' : 'Ne Kadar'}
						</p>
					</span>
					<span>
						<IoStatsChart className='prog-overview-icon' />
						<p className='fw-bold'>
							{program.id === 'BORN-TO-MOVE'
								? i18n.language === 'en'
									? 'Teens'
									: 'Gençler'
								: program.id === 'LES-MILLS-GRIT'
								? i18n.language === 'en'
									? 'Self\nImprovers'
									: 'Gelişmek\nİsteyenler'
								: i18n.language === 'en'
								? 'Everyone'
								: 'Herkes'}
						</p>
						<p className='fs-400 text-primary-100'>
							{i18n.language === 'en' ? 'For' : 'Kime'}
						</p>
					</span>
					{formatKeywords(program.lessons).length > 0 && ( //online inperson output
						<span>
							<TbWorld className='prog-overview-icon' />
							<p className='fw-bold'>{formatKeywords(program.lessons)}</p>
							<p className='fs-400 text-primary-100'>
								{i18n.language === 'en' ? 'How' : 'Nasıl'}
							</p>
						</span>
					)}
				</div>
				<hr
					style={{
						width: '20%',
						alignSelf: 'center',
						margin: '0rem',
						borderTopWidth: '3px',
					}}
				/>
				<label style={{ textAlign: 'center' }}>
					{i18n.language === 'en'
						? 'Click the buttons to download the the contents'
						: 'İçerikleri indirmek için butonlara tıklayınız'}
				</label>
				<div className='program-overview-button-con'>
					{buttonContent.map((content) => {
						return (
							<button onClick={() => content.function()}>
								<IoMdCloudDownload
									style={{
										width: '1.2rem',
										height: '100%',
										marginRight: '0.4rem',
									}}
									className='overview-icon'
								/>
								{content.text}
							</button>
						);
					})}
				</div>
				<HashLink
					to={'/programlar#' + program.id}
					style={{
						position: 'absolute',
						right: '1rem',
						bottom: '0.5rem',
						fontSize: '1.3rem',
					}}
					smooth
					scroll={(el) => scrollWithOffset(el)}
				>
					<FiMoreHorizontal />
				</HashLink>
			</div>
		</div>
	);
}
export default ProgramOverview;
