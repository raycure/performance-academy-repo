import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../Containers/Container';
import logo from '../../assets/LesmillsLogo.png';
import { ChartNoAxesCombined } from 'lucide-react';
import { Earth } from 'lucide-react';
import { Gem } from 'lucide-react';
import { Calendar1 } from 'lucide-react';
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
						<Earth
							strokeWidth={1.25}
							className='cardIcon'
							style={{ marginRight: '1rem' }}
						/>
						<h2 className='fs-minimal-heading'>
							{t('MainPage.GridCard.Title.0')}
						</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.0')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<ChartNoAxesCombined
							className='cardIcon'
							style={{ marginRight: '1rem' }}
						/>
						<h2 className='fs-minimal-heading'>
							{t('MainPage.GridCard.Title.1')}
						</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.2')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<Gem
							className='cardIcon'
							strokeWidth={1.25}
							style={{ marginRight: '1rem' }}
						/>
						<h2 className='fs-minimal-heading'>
							{t('MainPage.GridCard.Title.2')}
						</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.2')}</p>
				</div>
				<div className='gridCard'>
					<div className='gridCardHeading'>
						<Calendar1
							className='cardIcon'
							strokeWidth={1.25}
							style={{ marginRight: '1rem' }}
						/>
						<h2 className='fs-minimal-heading'>
							{t('MainPage.GridCard.Title.3')}
						</h2>
					</div>
					<p>{t('MainPage.GridCard.Content.3')}</p>
				</div>
			</div>
		</Container>
	);
}
export default BecomeInstructorCards;
