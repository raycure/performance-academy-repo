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
	const errRef = useRef();
	const navigate = useNavigate();
	let isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const [mailorNationalID, setMailorNationalID] = useState('11111111111');
	const [pwd, setPwd] = useState('aaA!1aaa');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);
	const [showForgotPassordForm, setShowForgotPassordForm] = useState(false);

	// useEffect(() => {
	// 	checkIsLoggedIn();
	// 	userRef.current.focus();
	// }, []);

	// let isLoggedIn = useSelector(selectIsLoggedIn);
	// const checkIsLoggedIn = () => {
	// 	if (isLoggedIn) {
	// 		navigate('/');
	// 	}
	// };

	// todo delete it im switching to a redux based approach
	// useEffect(() => {
	// 	const isLoggedIn = localStorage.getItem('isLoggedIn');
	// 	if (isLoggedIn === 'true') {
	// 		navigate('/');
	// 	}
	// }, []);

	const handleForgotPasswordForm = async () => {
		try {
			console.log('forgot pasword form triggered');

			let forgotPasswordData;
			if (mailorNationalID.includes('@')) {
				console.log('its an email');
				forgotPasswordData = { email: mailorNationalID };
			} else {
				console.log('its an natid');
				forgotPasswordData = { nationalID: mailorNationalID };
			}
			const response = await dispatch(
				AuthService({
					data: forgotPasswordData,
					method: 'POST',
					endpoint: `/forgotPassword`,
				})
			);
			console.log('response', response);

			if (response.payload.status === 200) {
				localStorage.setItem(
					'emailVerificationToken',
					response.payload.data.emailVerificationToken
				);
			}
			setMailorNationalID('');
			setSuccess(true);
			setLocalLoading(true);
			// todo addnotif to inform the user
		} catch (error) {
			console.log('error at forgot password', error);
		}
	};

	const handleSubmit = async () => {
		try {
			let loginData;
			if (mailorNationalID.includes('@')) {
				loginData = {
					email: mailorNationalID,
					password: pwd,
				};
			} else {
				loginData = {
					nationalID: mailorNationalID,
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
			setSuccess(true);
			setLocalLoading(false);
			// navigate('/');

			// setTimeout(() => {
			// 	navigate('/');
			// }, 2000);
		} catch (err) {
			if (err.response?.status === 429) {
				setErrMsg('Too many requests, please try again later.');
			}
			console.log('err', err);

			err.payload.data === undefined // todo find a way to listen for no internet connection
				? setErrMsg('int baglanti falan')
				: setErrMsg(err.payload?.data?.message);
		}
	};

	return (
		<>
			11111111111 <br></br> aaA!1aaa
			<div className='authentication-form-container box-shadow'>
				<form onSubmit={handleSubmit} className='authentication-form'>
					<img alt='logo' className='logo' src={logo}></img>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live='assertive'
					>
						{errMsg}
					</p>
					<h1>{t('Authentication.Greet.1')}</h1>
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
							forgot password? Reset it.
						</button>
					)}

					{showForgotPassordForm && (
						<p>
							Enter your email adress, we gonna send you a link to reset your
							password.
						</p>
					)}

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
									? 'forgot password'
									: 'sifremi unuttum'
								: i18n.language === 'en'
								? 'Sign In'
								: 'Giriş Yap'}
						</Button>
						<Link
							to='/register'
							className='fs-400 text-align-right text-container'
						>
							{t('Authentication.Redirect.1')}
						</Link>
					</div>

					<HoneypotInput />
				</form>
				<AuthenticationGreet />
			</div>
		</>
	);
}

export default Login;
