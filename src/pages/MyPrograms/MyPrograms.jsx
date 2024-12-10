import React, { useEffect } from 'react';
import ProgramOverview from '../../components/ProgramOverview/ProgramOverview';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import LicenceContactRedirect from '../../components/LicenceContactRedirect/LicenceContactRedirect';
function MyPrograms() {
	const userEventIDs = ['1', '3'];
	const navigate = useNavigate();
	const { i18n } = useTranslation('');
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
		<div>
			<p
				style={{
					maxWidth: '700px',
					marginInline: 'auto',
					textAlign: 'center',
					fontSize: '1.1rem',
					margin: '2rem auto',
					paddingInline: '1rem',
				}}
			>
				{i18n.language === 'en'
					? 'After attending the event, you will be able to access your training video through this platform. If you have joined the license program, you can access content that will be updated every three months through our mobile app, Les Mills Releases App. To activate your account, we will first complete your registration process. Please note that the account activation process may take a few days.'
					: 'Katıldığınız etkinlikten sonra, eğitim videonuzu bu platform üzerinden erişebilirsiniz. Lisans programına katıldıysanız 3 ayda bir yenilenecek içeriklere Les Mills Releases App mobil uygulamamız üzerinden ulaşabilirsiniz. Hesabınızın aktif hale gelmesi için öncelikle kayıt işleminizi gerçekleştireceğiz, hesap aktivasyon işlemi birkaç gün sürebileceğini unutmayınız.'}
				<br />
				{i18n.language === 'en'
					? 'After participating in the training, when you send us your training video, our team will review your submission. If your performance meets the required standards, you will earn your official certificate. Your certificate will be delivered to you via email.'
					: 'Eğitime katılım ardından eğitim videonuzu bize gönderdiğinizde, ekibimiz gönderinizi inceleyecek ve performansınız gereken standartlara uygunsa, resmi sertifikanızı kazanmış olacaksınız. Sertifikanız mail yoluyla size eriştirilecek.'}
			</p>
			<LicenceContactRedirect />
			{userEventIDs.map((id) => {
				return (
					<div key={id} style={{ margin: '4rem' }}>
						<ProgramOverview eventID={id} />
					</div>
				);
			})}
		</div>
	);
}
export default MyPrograms;
