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

	useEffect(() => {
		checkIsLoggedIn();
		userRef.current.focus();
	}, []);

	let isLoggedIn = useSelector(selectIsLoggedIn);
	const checkIsLoggedIn = () => {
		if (isLoggedIn) {
			navigate('/');
		}
	};

	// todo delete it im switching to a redux based approach
	// useEffect(() => {
	// 	const isLoggedIn = localStorage.getItem('isLoggedIn');
	// 	if (isLoggedIn === 'true') {
	// 		navigate('/');
	// 	}
	// }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let loginData;
			if (mailorNationalID.includes('@')) {
				console.log(mailorNationalID);

				loginData = { email: mailorNationalID, password: pwd };
			} else {
				console.log(mailorNationalID);

				loginData = { nationalID: mailorNationalID, password: pwd };
			}

			const response = await dispatch(
				AuthService({
					data: loginData,
					method: 'POST',
					endpoint: '/login',
				})
			);
			console.log('response loginde ', response);
			const accessToken = response.payload.data.accessToken;
			console.log('accessToken loginde', accessToken);
			localStorage.setItem('accessToken', accessToken);

			const isLoggedIn = response ? true : false; //todo change it to user roles and stuff
			localStorage.setItem('isLoggedIn', isLoggedIn);
			setMailorNationalID('');
			setPwd('');
			setSuccess(true);
			setLocalLoading(true);
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

					<div className='authentication-button-container'>
						<Button isLoading={localLoading || isLoading}>
							{i18n.language === 'en' ? 'Sign In' : 'Giriş Yap'}
						</Button>
						<Link
							to='/register'
							className='fs-400 text-align-right text-container'
						>
							{t('Authentication.Redirect.1')}
						</Link>
					</div>
				</form>
				<AuthenticationGreet />
			</div>
		</>
	);
}

export default Login;
