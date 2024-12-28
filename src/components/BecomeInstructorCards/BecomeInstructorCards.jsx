import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../Containers/Container';
import logo from '../../assets/LesmillsLogo.png';
import { FaUsers } from 'react-icons/fa';
import { IoEarth } from 'react-icons/io5';
import { IoDiamondSharp } from 'react-icons/io5';
import { IoCalendarNumber } from 'react-icons/io5';
import './BecomeInstructorCards.css';
function BecomeInstructorCards() {
	const { i18n, t } = useTranslation('translation');
	return (
		<Container className='bcm-instr-cards-outer-con'>
			<div
				className='fs-primary-heading center-item'
				style={{
					display: 'flex',
					alignContent: 'center',
					fontStyle: 'italic',
					marginBottom: '2rem',
				}}
			>
				{i18n.language === 'en' && 'BECOME A '}
				<img
					alt='Les Mills logo'
					className='logo bcm-instr-cards-logo'
					src={logo}
					style={{ width: 'auto' }}
				/>
				{i18n.language === 'en' ? 'INSTRUCTOR' : 'EĞİTMENİ OLUN'}
			</div>
			<div className='gridCardContainer'>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<IoEarth className='cardIcon' />
						<h2>{t('MainPage.GridCard.Title.0')}</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.0')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<FaUsers className='cardIcon' />
						<h2>{t('MainPage.GridCard.Title.1')}</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.1')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<IoDiamondSharp className='cardIcon' />
						<h2>{t('MainPage.GridCard.Title.2')}</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.2')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<IoCalendarNumber className='cardIcon' strokeWidth={1.25} />
						<h2>{t('MainPage.GridCard.Title.3')}</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.3')}</p>
				</div>
			</div>
		</Container>
	);
}
export default BecomeInstructorCards;
