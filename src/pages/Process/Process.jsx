import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Process.css';
import ProcessSelect from '../../components/ProcessSelect/ProcessSelect';
import FAQ from '../../components/FAQ/FAQ';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import LicenceContactRedirect from '../../components/LicenceContactRedirect/LicenceContactRedirect.jsx';
import { IoIosHelpCircleOutline } from 'react-icons/io';
function Process() {
	const { i18n, t } = useTranslation('translation');
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
	const headerStyle = {
		width: 'fit-content',
		padding: '1rem',
		marginInline: 'auto',
	};
	const topBotMargin = {
		marginTop: '6rem',
		marginBottom: '6rem',
	};
	const listItem = [
		<>{t('Process.Overview.0')}</>,
		<>{t('Process.Overview.1')}</>,
		<>{t('Process.Overview.2')}</>,
		<>{t('Process.Overview.3')}</>,
		<>{t('Process.Overview.4')}</>,
		<>{t('Process.Overview.5')}</>,
		<>{t('Process.Overview.6')}</>,
		<>{t('Process.Overview.7')}</>,
	];
	return (
		<div className='process-outer-con'>
			<div className='process-comparison-con'>
				<p
					style={{
						width: '80%',
						marginInline: 'auto',
						textAlign: 'center',
						fontSize: '1.2rem',
						...topBotMargin,
					}}
				>
					{t('Process.Comparison.Entry')}
				</p>
				<div>
					<h1
						className='fs-700'
						style={{ ...headerStyle, fontWeight: 'bolder' }}
					>
						{i18n.language === 'en'
							? 'Instructor Certificate'
							: 'Eğitmen Sertifikası'}
					</h1>
					<p style={{ width: '90%', marginInline: 'auto' }}>
						{t('Process.Comparison.Certification.Explanation')}
						<br />
						{t('Process.Comparison.Certification.Close')}
					</p>
					<div style={topBotMargin}>
						<h2 className='fs-650' style={headerStyle}>
							{i18n.language === 'en'
								? 'A Look Into The First Training'
								: 'İlk Eğitime Genel Bakış'}
						</h2>
						<ul className='process-initial-list'>
							{listItem.map((item) => {
								return (
									<li>
										<MdOutlineDoubleArrow className='listItemStyle' />
										{item}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div style={topBotMargin}>
					<h1
						className='fs-700'
						style={{ ...headerStyle, fontWeight: 'bolder' }}
					>
						{i18n.language === 'en' ? 'License' : 'Lisans'}
					</h1>
					<p style={{ width: '90%', marginInline: 'auto' }}>
						{t('Process.Comparison.License.Explanation')}
					</p>
				</div>

				<h2 className='fs-650' style={headerStyle}>
					{i18n.language === 'en'
						? 'Types of Licenses We Offer'
						: 'Sağladığımız Lisans Türleri'}
				</h2>
				<ProcessSelect />
				<div style={topBotMargin}>
					<h2 className='fs-650' style={headerStyle}>
						{i18n.language === 'en' ? 'License Features' : 'Lisans Özellikleri'}
					</h2>
					<ul className='process-license-list'>
						<li>
							<IoIosHelpCircleOutline className='licenseListIcon' />
							{t('Process.Comparison.License.Feature.0')}
						</li>
						<li>
							<IoIosHelpCircleOutline className='licenseListIcon' />
							{t('Process.Comparison.License.Feature.1')}
						</li>
						<li>
							<IoIosHelpCircleOutline className='licenseListIcon' />
							{t('Process.Comparison.License.Feature.2')}
						</li>
					</ul>
				</div>
			</div>
			<LicenceContactRedirect />

			<FAQ />
		</div>
	);
}
export default Process;
