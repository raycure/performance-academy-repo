import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios.js';
import { AuthService } from '../../auth/auth.service.js';

import AuthenticationGreet from './AuthenticationGreet.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './formStyle.css';
import Button from '../../components/Button/Button.jsx';
import logo from '../../assets/LesmillsLogo.png';
import {
	selectIsLoading,
	selectIsLoggedIn,
} from '../../redux/auth/authStateSlice.js';
import { useTranslation } from 'react-i18next';
import HoneypotInput from '../../components/Forms/HoneypotInput.jsx';

function Login() {
	const { t, i18n } = useTranslation('translation');
	const userRef = useRef();
	const navigate = useNavigate();
	let isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const [mailorNationalID, setMailorNationalID] = useState('11111111111');
	const [pwd, setPwd] = useState('aaA!1aaa');
	const [localLoading, setLocalLoading] = useState(false);
	const [showForgotPassordForm, setShowForgotPassordForm] = useState(false);

	useEffect(() => {
		checkIsLoggedIn();
		userRef.current.focus();
	}, []);

	let isLoggedIn = useSelector(selectIsLoggedIn);
	const checkIsLoggedIn = () => {
		if (isLoggedIn) {
			const verifyNotif = {
				type: 'error',
				duration: 2000,
				message:
					i18n.language === 'en'
						? "You're already logged in."
						: 'Hali hazırda oturumunuz bulunmaktadır.',
			};
			localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
			const notificationEvent = new Event('notificationEvent');
			window.dispatchEvent(notificationEvent);
			navigate('/');
		}
	};

	const handleForgotPasswordForm = async () => {
		try {
			let forgotPasswordData;
			if (/^\d+$/.test(mailorNationalID)) {
				forgotPasswordData = { nationalID: mailorNationalID };
			} else {
				forgotPasswordData = { email: mailorNationalID };
			}
			const response = await dispatch(
				AuthService({
					data: forgotPasswordData,
					method: 'POST',
					endpoint: `/forgotPassword`,
				})
			);
			if (response.payload.status === 200) {
				localStorage.setItem(
					'emailVerificationToken',
					response.payload.data.emailVerificationToken
				);
			}
			setMailorNationalID('');
			setPwd('');
			setShowForgotPassordForm(false);
		} catch (error) {
			console.log('error at forgot password', error);
		}
	};

	const handleSubmit = async () => {
		let loginData;
		if (/^\d+$/.test(mailorNationalID)) {
			loginData = {
				nationalID: mailorNationalID,
				password: pwd,
			};
		} else {
			loginData = {
				email: mailorNationalID,
				password: pwd,
			};
		}
		setLocalLoading(true);
		const response = await dispatch(
			AuthService({
				data: loginData,
				method: 'POST',
				endpoint: '/login',
			})
		);
		const accessToken = response.payload.data.accessToken;
		localStorage.setItem('accessToken', accessToken);

		setMailorNationalID('');
		setPwd('');
		// setTimeout(() => {
		// 	navigate('/');
		// }, 1000);
	};
	//11111111111  aaA!1aaa
	return (
		<div className='authentication-form-container box-shadow'>
			<form onSubmit={handleSubmit} className='authentication-form'>
				<img alt='logo' className='logo' src={logo}></img>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
						marginBottom: '2rem',
					}}
				>
					{!showForgotPassordForm && <h1>{t('Authentication.Greet.1')}</h1>}
					{showForgotPassordForm &&
						(i18n.language === 'en' ? (
							<p>
								Enter your email adress in the area below, we will send a link
								to your provided email address to reset your password.
							</p>
						) : (
							<p>
								Email adresinizi aşağıda bulunan alana giriniz, girilen adrese
								şifrenizi yenileyebilmeniz için bir link göndereceğiz.
							</p>
						))}
					<div className='centerLineAnimation'>
						<input
							type='text'
							ref={userRef}
							autoComplete='off'
							onChange={(e) => setMailorNationalID(e.target.value)}
							value={mailorNationalID}
							required
							placeholder={
								i18n.language === 'tr' ? 'e-mail ya da TC' : 'email or TC'
							}
						/>
					</div>
					{!showForgotPassordForm && (
						<div className='centerLineAnimation'>
							<input
								type='password'
								id='password'
								onChange={(e) => setPwd(e.target.value)}
								value={pwd}
								required
								placeholder={t('Authentication.Password.0')}
							/>
						</div>
					)}

					{!showForgotPassordForm && (
						<button
							onClick={() => setShowForgotPassordForm(!showForgotPassordForm)}
							type='button'
						>
							{i18n.language === 'en' ? (
								<>Forgot your password? Reset it here.</>
							) : (
								<>Şifrenizi mi unuttunuz? Buradan yenileyin.</>
							)}
						</button>
					)}
				</div>

				<div className='authentication-button-container'>
					<Button
						isLoading={localLoading || isLoading}
						onClick={(e) => {
							e.preventDefault(); // Prevent default form submission
							showForgotPassordForm
								? handleForgotPasswordForm()
								: handleSubmit();
						}}
					>
						{showForgotPassordForm
							? i18n.language === 'en'
								? 'Send Link'
								: 'Linki Gönder'
							: i18n.language === 'en'
							? 'Sign In'
							: 'Giriş Yap'}
					</Button>
					<Link to='/kaydol' className='fs-400 text-align-right text-container'>
						{t('Authentication.Redirect.1')}
					</Link>
				</div>

				<HoneypotInput />
			</form>
			<AuthenticationGreet />
		</div>
	);
}

export default Login;
