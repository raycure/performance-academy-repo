import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import './registerStyle.css';
import { register } from '../../auth/auth.service.js';
import { useDispatch } from 'react-redux';
import AuthenticationGreet from './AuthenticationGreet.jsx';
import Notification from '../../components/Notification/Notification.jsx';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/LesmillsLogo.png';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterForm() {
	const userRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [notification, setNotification] = useState(null);
	const showNotification = (message, type) => {
		setNotification({ message, type });
	};
	const handleCloseNotification = () => {
		setNotification(null);
	};

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [mail, setMail] = useState('');
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

	async function handleSubmit(e) {
		e.preventDefault();
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		const userAttempts = 0;
		if (!v1 || !v2) {
			setErrMsg('invalid entry');
			return;
		}

		try {
			const registerData = { username: user, password: pwd, email: mail };
			const response = await dispatch(register({ registerData }));
			setSuccess(true);
			setUser('');
			setPwd('');
			setMatchPwd('');
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (err) {
			if (err.response?.status === 429) {
				setErrMsg('Too many requests, please try again later.');
			}
			setErrMsg(err.data.message);
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
						className={validName || user ? 'form-icon-active' : ''}
						ref={userRef}
						autoComplete='off'
						onChange={(e) => setUser(e.target.value)}
						// look up for e its a onchange's default object and target here means the element
						// that triggered the event and value is the whatever the text written in the input field
						value={user}
						required
						aria-invalid={validName ? 'false' : 'true'}
						aria-describedby='uidnote'
						onFocus={() => setUserFocus(true)}
						onBlur={() => setUserFocus(false)}
					/>
					<div htmlFor='username' className='form-icon'>
						<FontAwesomeIcon
							icon={faCheck}
							className={validName ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validName || !user ? 'hide' : 'invalid'}
						/>
					</div>
				</div>
				<p
					id='uidnote'
					className={
						userFocus && user && !validName ? 'instructions' : 'offscreen'
					}
				>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.
					<br />
					Must begin with a letter.
					<br />
					Letters, numbers, underscores, hyphens allowed.
				</p>
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
				</div>
				<p
					id='pwdnote'
					className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
				>
					<FontAwesomeIcon icon={faInfoCircle} />
					8 to 24 characters.
					<br />
					Must include uppercase and lowercase letters, a number and a special
					character.
					<br />
					Allowed special characters:{' '}
					<span aria-label='exclamation mark'>!</span>{' '}
					<span aria-label='at symbol'>@</span>{' '}
					<span aria-label='hashtag'>#</span>{' '}
					<span aria-label='dollar sign'>$</span>{' '}
					<span aria-label='percent'>%</span>
				</p>
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
							className={validMatch && matchPwd ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validMatch || !matchPwd ? 'hide' : 'invalid'}
						/>
					</div>
				</div>
				<p
					id='confirmnote'
					className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
				>
					<FontAwesomeIcon icon={faInfoCircle} />
					Must match the first password input field.
				</p>

				<div className='authentication-button-container'>
					<Button
						onClick={() =>
							success &&
							showNotification('Success! Operation completed.', 'info')
						}
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
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={handleCloseNotification}
				/>
			)}
			<AuthenticationGreet />
		</div>
	);
}
export default RegisterForm;
