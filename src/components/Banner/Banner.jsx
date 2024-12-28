import React from 'react';
import './bannerStyle.css';
import Container from '../Containers/Container';
import { useTranslation } from 'react-i18next';

const Banner = () => {
	const bannerStyle = {
		backgroundColor: 'transparent',
		textAlign: 'center',
	};
	const { t, i18n } = useTranslation('translation');
	return (
		<Container>
			<section className='gridCardContainer' style={{ marginInline: 'auto' }}>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>1</span>
					</div>
					<div className='gridCardHeading center-item'>
						<h2 className='fs-minimal-heading center-item'>
							{t('Banner.Title.0')}
						</h2>
					</div>
					<p className='text-container'>{t('Banner.Content.0')}</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>2</span>
					</div>

					<div className='gridCardHeading center-item'>
						<h2 className='fs-minimal-heading center-item'>
							{t('Banner.Title.1')}
						</h2>
					</div>
					<p className='text-container'>{t('Banner.Content.1')}</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>3</span>
					</div>
					<div className='gridCardHeading'>
						<h2 className='fs-minimal-heading center-item'>
							{t('Banner.Title.2')}
						</h2>
					</div>
					<p className='text-container'>{t('Banner.Content.2')}</p>
				</div>
				<div className='gridCard' style={bannerStyle}>
					<div className='programStepContainers center-item'>
						<span className='programStepNumbers'>4</span>
					</div>
					<div className='gridCardHeading'>
						<h2 className='fs-minimal-heading center-item'>
							{t('Banner.Title.3')}
						</h2>
					</div>
					<p className='text-container'>{t('Banner.Content.3')}</p>
				</div>
			</section>
		</Container>
	);
};

export default Banner;
