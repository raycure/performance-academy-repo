import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { register } from '../../redux/auth/actions.js';
import { useDispatch } from 'react-redux';
import './registerStyle.css';
import RegisterForm from '../../components/Forms/RegisterForm.jsx';
import AuthenticationGreet from './AuthenticationGreet.jsx';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/api/products';

function Register() {
	const userRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();

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

		if (!v1 || !v2) {
			setErrMsg('invalid entry');
			return;
		}
		const registerData = { username: user, password: pwd, email: mail };
		dispatch(register({ registerData }));
		setSuccess(true);
		setUser('');
		setPwd('');
		setMatchPwd('');
	}
	return (
		<>
			<section>
				{/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
aria-live make it so screen reader reads the msg when its focused which we r already achiving with ref     */}
				<h1 ref={userRef}>Register</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='username'>
						Username:
						<FontAwesomeIcon
							icon={faCheck}
							className={validName ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validName || !user ? 'hide' : 'invalid'}
						/>
					</label>
					<input
						type='text'
						id='username'
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

					<p
						id='uidnote'
						className={
							userFocus && user && !validName
								? 'instructions'
								: 'offscreen'
						}
					>
						4 to 24 characters.
						<br />
						Must begin with a letter.
						<br />
						Letters, numbers, underscores, hyphens allowed.
					</p>
					<label htmlFor='email'>email:</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={(e) => setMail(e.target.value)}
						value={mail}
						required
					/>

					<label htmlFor='password'>
						Password:
						<FontAwesomeIcon
							icon={faCheck}
							className={validPwd ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validPwd || !pwd ? 'hide' : 'invalid'}
						/>
					</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						aria-invalid={validPwd ? 'false' : 'true'}
						aria-describedby='pwdnote'
						onFocus={() => setPwdFocus(true)}
						onBlur={() => setPwdFocus(false)}
					/>
					<p
						id='pwdnote'
						className={
							pwdFocus && !validPwd ? 'instructions' : 'offscreen'
						}
					>
						<FontAwesomeIcon icon={faInfoCircle} />
						8 to 24 characters.
						<br />
						Must include uppercase and lowercase letters, a number
						and a special character.
						<br />
						Allowed special characters:{' '}
						<span aria-label='exclamation mark'>!</span>{' '}
						<span aria-label='at symbol'>@</span>{' '}
						<span aria-label='hashtag'>#</span>{' '}
						<span aria-label='dollar sign'>$</span>{' '}
						<span aria-label='percent'>%</span>
					</p>

					<label htmlFor='confirm_pwd'>
						Confirm Password:
						<FontAwesomeIcon
							icon={faCheck}
							className={
								validMatch && matchPwd ? 'valid' : 'hide'
							}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={
								validMatch || !matchPwd ? 'hide' : 'invalid'
							}
						/>
					</label>
					<input
						type='password'
						id='confirm_pwd'
						onChange={(e) => setMatchPwd(e.target.value)}
						value={matchPwd}
						required
						aria-invalid={validMatch ? 'false' : 'true'}
						aria-describedby='confirmnote'
						onFocus={() => setMatchFocus(true)}
						onBlur={() => setMatchFocus(false)}
					/>
					<p
						id='confirmnote'
						className={
							matchFocus && !validMatch
								? 'instructions'
								: 'offscreen'
						}
					>
						<FontAwesomeIcon icon={faInfoCircle} />
						Must match the first password input field.
					</p>
					<button
						className='btn'
						disabled={
							!validName || !validPwd || !validMatch
								? true
								: false
						}
						type='submit'
					>
						Sign Up
					</button>
				</form>

				<p>
					Already registered?
					<br />
					<span className='line'>
						{/*put router link here*/}
						<a href='#'>Sign In</a>
					</span>
				</p>
			</section>
			<div className='register-form-container box-shadow'>
				<RegisterForm />
				<AuthenticationGreet />
			</div>
		</>
	);
}

export default Register;
