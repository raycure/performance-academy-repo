import React, { act, useEffect } from 'react';
import './ProgramOverview.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { FaRegClock } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { TbWorld } from 'react-icons/tb';
import { IoMdCloudDownload } from 'react-icons/io';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../auth/auth.service';
import BynderEmbed from '../BynderEmbed/BynderEmbed';
import { useState } from 'react';
function ProgramOverview({ eventDetails }) {
	const { i18n, t } = useTranslation('translation');
	const activeEvent = LesMillsEvents.find((event) => {
		return event.id === eventDetails.eventId;
	});
	function getTimeLine() {
		const eventDate = activeEvent.fullStartDate;
		const isFuture = eventDate > new Date();
		const date = eventDate.toLocaleDateString('en-GB');
		const attemptDeadline = new Date(activeEvent.fullEndDate);
		attemptDeadline.setDate(attemptDeadline.getDate() + 7);
		return isFuture
			? { status: 'future', date }
			: { status: 'past', date: attemptDeadline.toLocaleDateString('en-GB') };
	}
	const daysLeftOrBeen = getTimeLine();

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
	useEffect(() => {
		const animatedElements = document.querySelectorAll('.addLineAnimation');

		animatedElements.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				element.classList.add('lineAnimation');
				element.addEventListener('mouseleave', () => {
					element.classList.add('notHoveredLineAnimation');
				});
				element.classList.remove('notHoveredLineAnimation');
			});
		});
	});

	const lessonLength = extractNumbersFromString(program.lessons);
	const handlePlaylistDowload = () => {};
	const handleBookletDowload = () => {};
	const handleChoreographyDowload = () => {};
	const handleExamDowload = () => {};
	const assessmentFormResult = true; //dosya yüklendi mi diye, sadece button disablelamak amacıyla kullandım
	const examAttempts = eventDetails.examAttempts;
	const lastExamResult = examAttempts[examAttempts.length - 1].result;
	const leftAssessmentTries =
		examAttempts.length === 0 ? 3 : 3 - examAttempts.length;
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

	const dispatch = useDispatch();
	async function payExamFee() {
		const eventId = eventDetails.eventId;
		const response = await dispatch(
			AuthService({
				method: 'POST',
				endpoint: '/pay',
				data: { id: eventId, purchaseType: 'payExamFee' },
			})
		);
		const paymentUrl = response.payload.data.url;
		if (paymentUrl) {
			window.location = paymentUrl;
		}
	}

	return (
		<div
			className='prog-overview-outer-con text-container'
			id={eventDetails.eventId}
		>
			<BynderEmbed
				styleProp={{
					padding: '0px',
					maxWidth: '680px',
					display: 'flex',
					justifyContent: 'center',
					margin: 'auto',
				}}
				className='program-overview-video'
				mediaId={program.mediaId}
				accountUrl='https://marketing.lesmills.com'
				language={i18n.language}
				autoplay={false}
			/>
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
				<div className='program-overview-assessment-con'>
					{lastExamResult === 'failed' ? (
						<div className='fs-400'>
							<p style={{ color: '#ef3f3f' }}>
								{i18n.language === 'en'
									? 'Exam Result: Failed'
									: 'Sınav Sonucu: Başarısız'}
							</p>
							<p>
								{i18n.language === 'en'
									? 'Amount of assessment tries left'
									: 'Kalan sınav deneme hakkı'}
								: {leftAssessmentTries}
							</p>
							{leftAssessmentTries >= 1 ? (
								<>
									<hr
										style={{
											width: '35%',
											margin: '0.5rem auto',
											borderTopWidth: '3px',
										}}
									/>
									<div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
										<p className='fs-300' style={{ marginBottom: '0.3rem' }}>
											{i18n.language === 'en'
												? 'If you want to retake the exam click the link below to pay the exam fee.'
												: 'Tekrar sınava girmek istiyorsanız aşağıdaki link üzerinden sınav ücretini ödeyebilirsiniz.'}
										</p>
										<Link
											style={{
												display: 'flex',
												width: 'fit-content',
												marginInline: 'auto',
												gap: '0.3rem',
											}}
											className='addLineAnimation'
											onClick={payExamFee}
										>
											{i18n.language === 'en'
												? 'Pay The Exam Fee'
												: 'Sınav Ücretini Öde'}
											<IoMdArrowRoundForward
												style={{
													position: 'relative',
													top: '1px',
													width: '1.2rem',
													height: '100%',
												}}
												className='process-contact-icon'
											/>
										</Link>
									</div>
								</>
							) : (
								<p>
									{i18n.language === 'en'
										? 'Unfortunately, your exam attempts have been exhausted. To obtain the certificate, you will need to participate in one of our events again and retake the training from the beginning.'
										: 'Maalesef sınav haklarınız bitmiştir. Sertifika alabilmek için tekrardan bir etkinliğimize katılıp, eğitimi baştan almanız gerekmektedir.'}
								</p>
							)}
						</div>
					) : lastExamResult === 'passed' ? (
						<div>
							<p style={{ color: '#67ef55' }}>
								{i18n.language === 'en'
									? 'Exam Result: Passed'
									: 'Sınav Sonucu: Başarılı'}
							</p>
							<p>
								{i18n.language === 'en'
									? 'Your certificate will be provided to you through email.'
									: 'Sertifikanız e-posta yoluyla en yakın zamanda size ulaştırılacaktır.'}
							</p>
						</div>
					) : lastExamResult === 'pending' ? (
						<div>
							<p style={{ color: '#aaaaaa' }}>
								{i18n.language === 'en'
									? 'Exam Result: Under Review'
									: 'Sınav Sonucu: İnceleme Altında'}
								...
							</p>
							<p>
								{i18n.language === 'en'
									? 'Amount of assessment tries left'
									: 'Kalan sınav deneme hakkı'}
								: {leftAssessmentTries}
							</p>
						</div>
					) : (
						<div>
							{' '}
							{daysLeftOrBeen.status === 'future' ? (
								<p>
									{i18n.language === 'en'
										? `We are thrilled to have you join us at the start of our event!
									Event begins: ${daysLeftOrBeen.date}`
										: `Sizi aramızda görmek için sabırsızlanıyoruz! Etkinlik başlangıcı: ${daysLeftOrBeen.date}`}
								</p>
							) : (
								<p>
									{i18n.language === 'en'
										? `Exam submission deadline: ${daysLeftOrBeen.date}`
										: `Sınav teslimi yapmanız gereken tarih: ${daysLeftOrBeen.date}`}
								</p>
							)}
						</div>
					)}
				</div>
				<hr
					style={{
						width: '35%',
						alignSelf: 'center',
						margin: '0rem',
						borderTopWidth: '3px',
					}}
				/>
				<label className='fs-400' style={{ textAlign: 'center' }}>
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
										flexShrink: '0',
									}}
									className='overview-icon'
								/>
								{content.text}
							</button>
						);
					})}
					<button
						disabled={assessmentFormResult === false}
						onClick={() => handleExamDowload()}
					>
						<IoMdCloudDownload
							style={{
								width: '1.2rem',
								height: '100%',
								marginRight: '0.4rem',
								flexShrink: '0',
							}}
							className='overview-icon'
						/>
						{i18n.language === 'en' ? 'Assessment Form' : 'Değerlendirme Formu'}
					</button>
				</div>
				<HashLink
					to={'/programlar#' + program.id}
					className='program-overview-redirect-icon'
					smooth
					scroll={(el) => scrollWithOffset(el)}
				>
					<RxQuestionMarkCircled />
				</HashLink>
			</div>
		</div>
	);
}
export default ProgramOverview;
