import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import { AuthService } from '../../auth/auth.service.js';
import { useDispatch, useSelector } from 'react-redux';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { selectError } from '../../redux/auth/authStateSlice.js';
import { motion } from 'framer-motion';
import { descending } from '../../components/animations/AnimationValues.jsx';
import { selectIsLoading } from '../../redux/auth/authStateSlice.js';
import './registerStyle.css';
import './formStyle.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { GoShieldLock } from 'react-icons/go';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
const forgotPassword = () => {
	const { token } = useParams(); // React Router hook
	const { t, i18n } = useTranslation('translation');
	const dispatch = useDispatch();
	const passwordValidationRules = [
		{
			test: (pwd) => !/(?=.*[a-z])(?=.*[A-Z])/.test(pwd),
			message: t('Authentication.Validation.Password.0'),
		},
		{
			test: (pwd) => !/(?=.*\d)/.test(pwd),
			message: t('Authentication.Validation.Password.1'),
		},
		{
			test: (pwd) => /\s/.test(pwd),
			message: t('Authentication.Validation.Password.2'),
		},
		{
			test: (pwd) =>
				!/^[a-zA-Z\d~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'\.,:;]+$/.test(pwd),
			message: t('Authentication.Validation.Password.3'),
		},
		{
			test: (pwd) => pwd.length < 8 || pwd.length >= 24,
			message: t('Authentication.Validation.Password.4'),
		},
	];

	useEffect(() => {
		console.log('token', token);
	}, [token]);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	const [passwordOnTop, setPasswordOnTop] = useState(true);
	const [passwordOnBottom, setPasswordOnBottom] = useState(true);
	useEffect(() => {
		const valid = passwordValidationRules.every((rule) => !rule.test(pwd));
		setValidPwd(valid);
	}, [pwd]);

	useEffect(() => {
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [pwd, matchPwd]);

	async function handleResetPassword(e) {
		e.preventDefault();
		const resetPasswordData = {
			newPassword: pwd,
			token: token,
		};
		await dispatch(
			AuthService({
				data: resetPasswordData,
				endpoint: '/forgotPassword/${token}',
				method: 'POST',
			})
		);
	}
	const eyeButtonCon = {
		margin: 'auto 0.5rem',
		position: 'absolute',
		right: '0px',
		top: '50%',
		transform: 'translateY(-50%)',
		display: 'flex',
		alignItems: 'center',
	};
	const eyeButton = {
		display: 'inline-block',
		width: '1.3rem',
		height: '1.3rem',
		flexShrink: '0',
	};
	return (
		<div className=' forgot-password-con '>
			<div className='forgot-password-icon'>
				<GoShieldLock />
			</div>
			<form className='forgot-password-form'>
				<div className='relative-position centerLineAnimation'>
					<FontAwesomeIcon
						icon={faCheck}
						className={validPwd ? 'valid' : 'hide'}
					/>
					<FontAwesomeIcon
						icon={faTimes}
						className={validPwd || !pwd ? 'hide' : 'invalid'}
					/>
					<input
						type={passwordOnTop ? 'password' : 'text'}
						id='password'
						placeholder={t('Authentication.Password.0')}
						className={validPwd || pwd ? 'form-icon-active' : ''}
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						aria-invalid={validPwd ? 'false' : 'true'}
						aria-describedby='pwdnote'
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
					<button
						style={eyeButtonCon}
						onClick={() => setPasswordOnTop(!passwordOnTop)}
						type='button'
					>
						{passwordOnTop ? (
							<IoEyeOff style={eyeButton} />
						) : (
							<IoEye style={eyeButton} />
						)}
					</button>
				</div>
				<div className='relative-position centerLineAnimation'>
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
					<input
						type={passwordOnBottom ? 'password' : 'text'}
						id='confirm_pwd'
						placeholder={t('Authentication.Password.1')}
						className={matchPwd ? 'form-icon-active' : ''}
						onChange={(e) => setMatchPwd(e.target.value)}
						value={matchPwd}
						required
						aria-invalid={validMatch ? 'false' : 'true'}
						aria-describedby='confirmnote'
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
					<button
						style={eyeButtonCon}
						onClick={() => setPasswordOnBottom(!passwordOnBottom)}
						type='button'
					>
						{passwordOnBottom ? (
							<IoEyeOff style={eyeButton} />
						) : (
							<IoEye style={eyeButton} />
						)}
					</button>
				</div>
				<Button
					styleProp={{ alignSelf: 'center' }}
					onClick={handleResetPassword}
				>
					{i18n.language === 'en' ? 'Reset password' : 'Şifreni sıfırla'}
				</Button>
			</form>
		</div>
	);
};

export default forgotPassword;
