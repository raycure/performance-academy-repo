import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import './registerStyle.css';
import { AuthService } from '../../auth/auth.service.js';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationGreet from './AuthenticationGreet.jsx';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/LesmillsLogo.png';
import { useNavigate } from 'react-router-dom';
import { selectError } from '../../redux/auth/authStateSlice.js';
import { motion } from 'framer-motion';
import { descending } from '../../components/animations/AnimationValues.jsx';
import { selectIsLoading } from '../../redux/auth/authStateSlice.js';
import './formStyle.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

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
		console.log('token', token);

		try {
			const resetPasswordData = {
				newPassword: pwd,
				token: token,
			};
			const response = await dispatch(
				AuthService({
					data: resetPasswordData,
					endpoint: '/forgotPassword/${token}',
					method: 'POST',
				})
			);
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
		<>
			<div className='authentication-form-container box-shadow'>
				<form className='authentication-form'>
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
							type='password'
							id='password'
							placeholder={t('Authentication.Password.0')}
							className={validPwd || pwd ? 'form-icon-active' : ''}
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby='pwdnote'
						/>
						<motion.p
							initial='hidden'
							variants={descending}
							whileInView='show'
							id='pwdnote'
							className={!validPwd && pwd ? 'instructions' : 'offscreen'}
						>
							{passwordValidationRules.find((rule) => rule.test(pwd))
								?.message || ''}
						</motion.p>
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
							type='password'
							id='confirm_pwd'
							placeholder={t('Authentication.Password.1')}
							className={matchPwd ? 'form-icon-active' : ''}
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby='confirmnote'
						/>
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
					<Button onClick={handleResetPassword}>
						{i18n.language === 'en' ? 'Reset password' : 'Şifreni sıfırla'}
					</Button>
				</form>
			</div>
		</>
	);
};

export default forgotPassword;
