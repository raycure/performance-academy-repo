import React, { useEffect, useState } from 'react';
import ProgramOverview from '../../components/ProgramOverview/ProgramOverview';
import '../../components/ProgramOverview/ProgramOverview.css';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import LicenceContactRedirect from '../../components/LicenceContactRedirect/LicenceContactRedirect';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../auth/auth.service';
function MyPrograms() {
	const dispatch = useDispatch();
	useEffect(() => {
		initUserInfo();
	}, []);
	const initUserInfo = async () => {
		try {
			const response = await dispatch(
				AuthService({
					method: 'GET',
					endpoint: '/userInfo',
				})
			);
			const user = response.payload.data.foundUser;
			const userPurchases = user.purchases;
			console.log('userPurchases', userPurchases);
			setUserEventIds(userPurchases);
		} catch (error) {
			console.log('userinfo fetch error', error);
		}
	};

	const [userEventIds, setUserEventIds] = useState([]);

	const navigate = useNavigate();
	const { t, i18n } = useTranslation('');
	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		if (!isLoggedIn) {
			const verifyNotif = {
				type: 'info',
				duration: 3000,
				message: 'Please login',
			};
			localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
			const notificationEvent = new Event('notificationEvent');
			window.dispatchEvent(notificationEvent);
			navigate('/giriş-yap');
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
			{userEventIds.length === 0 ? (
				<section style={{ textAlign: 'center' }}>
					{i18n.language === 'en'
						? 'No programs purchased yet.'
						: 'Henüz hiç program satın alınmadı.'}
				</section>
			) : (
				/* (
				userEventIds.map((item) => (
					<div key={item.productId} style={{ margin: '4rem' }}>
						<ProgramOverview eventID={item.productId} />
					</div>
				))
			)} */
				userEventIds.map((item) => (
					<div key={item.productId} style={{ margin: '4rem' }}>
						<ProgramOverview eventDetails={item} />
					</div>
				))
			)}
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
