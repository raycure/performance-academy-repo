import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import './registerStyle.css';
import { register } from '../../auth/auth.service.js';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationGreet from './AuthenticationGreet.jsx';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/LesmillsLogo.png';
import { useNavigate } from 'react-router-dom';
import { selectError } from '../../redux/auth/authStateSlice.js';
import { motion } from 'framer-motion';
import { descending } from '../../components/animations/AnimationValues.jsx';

import './formStyle.css';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterForm() {
	const usernameValidationRules = [
		{
			test: (username) => !/^[a-zA-Z]/.test(username),
			message: 'have to start with a letter.',
		},
		{
			test: (username) => !/^[a-zA-Z0-9.]+$/.test(username),
			message: 'only letters numbers and dots.',
		},
		{
			test: (username) => username.length < 4 || username.length >= 24,
			message: '4 to 24 characters.',
		},
	];
	const passwordValidationRules = [
		{
			test: (pwd) => !/(?=.*[a-z])(?=.*[A-Z])/.test(pwd),
			message: 'At least one uppercase and one lowercase letter.',
		},
		{
			test: (pwd) => !/(?=.*\d)/.test(pwd),
			message: 'At least one numeral.',
		},
		{
			test: (pwd) => /\s/.test(pwd),
			message: 'No spaces.',
		},
		{
			test: (pwd) =>
				!/^[a-zA-Z\d~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'\.,:;]+$/.test(pwd),
			message: 'Only Latin characters.',
		},
		{
			test: (username) => pwd.length < 8 || pwd.length >= 24,
			message: '8 to 24 characters.',
		},
	];

	const fetchError = useSelector(selectError);
	const userRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [validName, setValidName] = useState(false);
	const [mail, setMail] = useState('');
	const [userFocus, setUsernameFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const valid = usernameValidationRules.every((rule) => !rule.test(username));
		setValidName(valid);
	}, [username]);

	useEffect(() => {
		const valid = passwordValidationRules.every((rule) => !rule.test(pwd));
		setValidPwd(valid);
	}, [pwd]);

	useEffect(() => {
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [username, pwd, matchPwd]);

	function displayNotif() {
		const myObject = {
			type: 'info',
			duration: 5000,
			message: 'Verify Mail sent',
		};
		localStorage.setItem('Notifexp', JSON.stringify(myObject));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		// const v1 = USER_REGEX.test(user);
		// const v2 = PWD_REGEX.test(pwd);
		// if (!v2) {
		// 	setErrMsg('invalid entry');
		// 	return;
		// } //todo prevent making a submit if theres no validpwd and username and

		try {
			const registerData = { username: username, password: pwd, email: mail };
			const response = await dispatch(register({ registerData }));
			setUsername('');
			setPwd('');
			setMatchPwd('');
			const isLoggedIn = response ? true : false; //todo change it to user roles and stuff
			const accessToken = response.payload.accessToken;
			localStorage.setItem('isLoggedIn', isLoggedIn);
			localStorage.setItem('accessToken', accessToken);
			displayNotif();
			setTimeout(() => {
				navigate('/');
			}, 2000);
		} catch (err) {
			if (err.response?.status === 429) {
				setErrMsg('Too many requests, please try again later.');
			}
			console.log('err', err);

			err.payload?.data === undefined
				? setErrMsg('int baglanti falan') // todo gercekten kontrol etmiyor server kapatilinca ancak calisiyor ve baglanti yokken calismiyor
				: setErrMsg(err.payload?.data?.message);
		}
	}
	return (
		<div className='authentication-form-container box-shadow bottom-space'>
			<form onSubmit={handleSubmit} className='authentication-form'>
				<img alt='logo' className='logo' src={logo}></img>
				<p
					ref={errRef}
					className={errMsg ? 'errmsg' : 'offscreen'}
					aria-live='assertive'
				>
					{errMsg}
				</p>
				<p ref={userRef}>Kaydolun!</p>
				<div className='relative-position centerLineAnimation'>
					<input
						type='text'
						placeholder='Kullanıcı Adı'
						id='username'
						className={validName || username ? 'form-icon-active' : ''}
						ref={userRef}
						autoComplete='off'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						required
						aria-invalid={validName ? 'false' : 'true'}
						aria-describedby='uidnote'
						onFocus={() => setUsernameFocus(true)}
						onBlur={() => setUsernameFocus(false)}
					/>
					<div htmlFor='username' className='form-icon'>
						<FontAwesomeIcon
							icon={faCheck}
							className={validName ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validName || !username ? 'hide' : 'invalid'}
						/>
					</div>
					<motion.p
						initial='hidden'
						variants={descending}
						whileInView='show'
						id='uidnote'
						className={username && !validName ? 'instructions' : 'offscreen'}
					>
						{usernameValidationRules.find((rule) => rule.test(username))
							?.message || ''}
					</motion.p>
				</div>
				<div className='centerLineAnimation'>
					<input
						type='email'
						id='email'
						placeholder='Email'
						name='email'
						onChange={(e) => setMail(e.target.value)}
						value={mail}
						required
					/>
				</div>
				<div className='relative-position centerLineAnimation'>
					<input
						type='password'
						id='password'
						placeholder='Şifre'
						className={validPwd || pwd ? 'form-icon-active' : ''}
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						aria-invalid={validPwd ? 'false' : 'true'}
						aria-describedby='pwdnote'
						onFocus={() => setPwdFocus(true)}
						onBlur={() => setPwdFocus(false)}
					/>
					<div htmlFor='password' className='form-icon'>
						<FontAwesomeIcon
							icon={faCheck}
							className={validPwd ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validPwd || !pwd ? 'hide' : 'invalid'}
						/>
					</div>
					<motion.p
						initial='hidden'
						variants={descending}
						whileInView='show'
						id='pwdnote'
						className={!validPwd && pwd ? 'instructions' : 'offscreen'}
					>
						{passwordValidationRules.find((rule) => rule.test(pwd))?.message ||
							''}
					</motion.p>
				</div>
				<div className='relative-position centerLineAnimation'>
					<input
						type='password'
						id='confirm_pwd'
						placeholder='Tekrar Şifre'
						className={matchPwd ? 'form-icon-active' : ''}
						onChange={(e) => setMatchPwd(e.target.value)}
						value={matchPwd}
						required
						aria-invalid={validMatch ? 'false' : 'true'}
						aria-describedby='confirmnote'
						onFocus={() => setMatchFocus(true)}
						onBlur={() => setMatchFocus(false)}
					/>
					<div htmlFor='confirm_pwd' className='form-icon'>
						<FontAwesomeIcon
							icon={faCheck}
							className={validMatch && matchPwd && validPwd ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={
								(!validMatch || !pwd || !validPwd) && matchPwd
									? 'invalid'
									: 'hide'
							}
						/>
					</div>
					<motion.p
						initial='hidden'
						variants={descending}
						whileInView='show'
						id='confirmnote'
						className={
							(!validMatch || !pwd || !validPwd) && matchPwd
								? 'instructions'
								: 'offscreen'
						}
					>
						{!validPwd
							? 'no valid password'
							: 'Must match the first password input field'}
					</motion.p>
				</div>

				<div className='authentication-button-container'>
					<Button
						disabled={!validName || !validPwd || !validMatch ? true : false}
						type='submit'
					>
						Kaydol
					</Button>
					<Link to='/login' className='fs-400 text-align-right'>
						Zaten bir hesabınız var mı? <br />
						Buradan giriş yapın!
					</Link>
				</div>
			</form>
			<AuthenticationGreet />
		</div>
	);
}
export default RegisterForm;
