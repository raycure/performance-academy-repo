import React, { useEffect } from 'react';
import ProgramOverview from '../../components/ProgramOverview/ProgramOverview';
import '../../components/ProgramOverview/ProgramOverview.css';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import LicenceContactRedirect from '../../components/LicenceContactRedirect/LicenceContactRedirect';
function MyPrograms() {
	const userEventIDs = ['1', '3'];
	const navigate = useNavigate();
	const { t, i18n } = useTranslation('');
	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		if (!isLoggedIn) {
			const verifyNotif = {
				type: 'info',
				duration: 5000,
				message: 'Please login',
			};
			localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
			const notificationEvent = new Event('notificationEvent');
			window.dispatchEvent(notificationEvent);
			navigate('/login');
		}
	}, []);
	return (
		<section className='text-container'>
			<p
				style={{
					maxWidth: '700px',
					marginInline: 'auto',
					textAlign: 'center',
					fontSize: '1.2rem',
					paddingInline: '1rem',
				}}
			>
				{t('MyPrograms.Entry')}
			</p>
			{userEventIDs.map((id) => {
				return (
					<div key={id} style={{ margin: '4rem 2rem' }}>
						<ProgramOverview eventID={id} />
					</div>
				);
			})}
			<div className='my-programs-list-grid'>
				<ul className='my-programs-list'>
					<h1>
						<AiOutlineExclamationCircle />
						{i18n.language === 'en'
							? 'Certificate Reminder'
							: 'Sertifika Hatırlatması'}
					</h1>
					<li>{t('MyPrograms.item1')}</li>
					<ul>
						<p>{t('MyPrograms.item2.0')}</p>
						<li>{t('MyPrograms.item2.1')}</li>
						<li>{t('MyPrograms.item2.2')}</li>
					</ul>
					<ul>
						<p>{t('MyPrograms.item3.0')}</p>
						<li>{t('MyPrograms.item3.1')}</li>
						<li>{t('MyPrograms.item3.2')}</li>
					</ul>
				</ul>
				<ul className='my-programs-list'>
					<h1>
						<AiOutlineExclamationCircle />
						{i18n.language === 'en'
							? 'License Reminder'
							: 'Lisans Hatırlatması'}
					</h1>
					<li>{t('MyPrograms.item4')}</li>
					<ul>
						<p>{t('MyPrograms.item5.0')}</p>
						<li>{t('MyPrograms.item5.1')}</li>
						<li>{t('MyPrograms.item5.2')}</li>
					</ul>
				</ul>
			</div>
			<LicenceContactRedirect />
		</section>
	);
}
export default MyPrograms;
