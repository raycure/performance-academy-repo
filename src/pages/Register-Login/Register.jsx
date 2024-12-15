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
import HoneypotInput from '../../components/Forms/HoneypotInput.jsx';

function RegisterForm() {
	const { t, i18n } = useTranslation('translation');
	let isLoading = useSelector(selectIsLoading); //for button to be in the loading state
	const [localLoading, setLocalLoading] = useState(false); // the button needs to be in isLoading stage before the api request is pending so the user sees loading state as soon as submitting
	const nationalIDrules = [
		{
			test: (nationalID) => !/^[0-9]+$/.test(nationalID),
			message: t('Authentication.Validation.UserId.0'),
		},
		{
			test: (nationalID) => nationalID.length != 11,
			message: t('Authentication.Validation.UserId.1'),
		},
	];
	const nameSurnameRules = [
		{
			test: (nameOrSurname) => !/^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]+$/.test(nameOrSurname),
			message: t('Authentication.Validation.nameOrSurname.0'),
		},
		{
			test: (nameOrSurname) =>
				nameOrSurname.length < 3 || nameOrSurname.length >= 24,
			message: t('Authentication.Validation.nameOrSurname.1'),
		},
	];
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

	const fetchError = useSelector(selectError);
	const userRef = useRef();
	const dateRef = useRef();
	const errRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [validName, setValidName] = useState(false);
	const [validSurename, setValidSurname] = useState(false);
	const [validNationalID, setValidNationalID] = useState(false);
	const [birthDate, setBirthDate] = useState('');
	const [forApiBirthDate, setForApiBirthDate] = useState('');
	const [birthDateError, setBirthDateError] = useState('');
	const [mail, setMail] = useState('');
	const [validBirthDate, setValidBirthDate] = useState(false);
	const [nationalID, setNationalID] = useState('');
	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const valid = nameSurnameRules.every((rule) => !rule.test(name));
		setValidName(valid);
	}, [name]);

	useEffect(() => {
		const valid = nameSurnameRules.every((rule) => !rule.test(surname));
		setValidSurname(valid);
	}, [surname]);

	useEffect(() => {
		const valid = nationalIDrules.every((rule) => !rule.test(nationalID));
		setValidNationalID(valid);
	}, [nationalID]);

	useEffect(() => {
		const valid = passwordValidationRules.every((rule) => !rule.test(pwd));
		setValidPwd(valid);
	}, [pwd]);

	useEffect(() => {
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [name, nationalID, pwd, matchPwd]);

	function displayNotif() {
		const verifyNotif = {
			type: 'info',
			duration: 5000,
			message: 'Verify Mail sent',
		};
		localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const registerData = {
				name: name,
				surname: surname,
				nationalID: nationalID,
				birthDate: forApiBirthDate,
				password: pwd,
				email: mail,
			};
			const response = await dispatch(
				AuthService({
					data: registerData,
					endpoint: '/register',
					method: 'POST',
				})
			);
			// setName('');
			// setSurname('');
			// setLocalLoading(true);
			// setNationalID('');
			// setPwd('');
			// setMatchPwd('');
			// displayNotif();
			// setTimeout(() => {
			// 	navigate('/');
			// }, 1500);
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

	useEffect(() => {
		if (birthDate.length === 0) {
			setBirthDateError('');
		}
	}, [birthDate]);

	useEffect(() => {
		if (!validBirthDate) {
			setForApiBirthDate(null);
		}
	}, [validBirthDate]);

	function handleBirthDate(e) {
		let formattedDate = '';
		if (e.target.value.length < 11) {
			const value = e.target.value.replace(/\D/g, '');
			let day = value.substring(0, 2);
			let month = value.substring(2, 4);
			let year = value.substring(4, 8);
			const currentYear = new Date().getFullYear();
			for (let i = 0; i < value.length; i++) {
				if (
					(month.length <= 1 && parseInt(month) > 1) ||
					(day.length <= 1 && parseInt(day) > 3) ||
					(month.length === 2 && parseInt(month) > 12) ||
					parseInt(day) > 31 ||
					(day.length === 2 && parseInt(day) <= 0) ||
					(month.length === 2 && parseInt(month) <= 0)
				) {
					setBirthDateError(
						i18n.language === 'en' ? 'Invalid date' : 'Hatalı tarih formatı.'
					);
					return;
				}
				if (
					parseInt(year) > currentYear ||
					(year.length === 4 && parseInt(year) < 1900)
				) {
					setBirthDateError(
						i18n.language === 'en' ? 'Invalid year' : 'Hatalı yıl formatı.'
					);
					return;
				}
				setBirthDateError('');
				if (i === 2 || i === 4) {
					formattedDate += '/' + value[i];
				} else {
					formattedDate += value[i];
				}
			}
			if (formattedDate.length === 10 && year.length === 4) {
				setValidBirthDate(true);
				const isoDate = new Date(
					Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)) -
						new Date().getTimezoneOffset() * 60000
				);
				setForApiBirthDate(isoDate);
				setBirthDateError('');
			} else {
				setValidBirthDate(false);
			}
		} else {
			return;
		}
		setBirthDate(formattedDate);
	}

	return (
		<div className='authentication-form-container box-shadow'>
			<form onSubmit={handleSubmit} className='authentication-form'>
				<p
					ref={errRef}
					className={errMsg ? 'errmsg' : 'offscreen'}
					aria-live='assertive'
				>
					{errMsg}
				</p>
				<div className='twoInputAreas'>
					<div className='relative-position centerLineAnimation'>
						<div>
							<input
								type='text'
								placeholder={t('Authentication.Name')}
								id='name'
								className={validName || name ? 'form-icon-active' : ''}
								ref={userRef}
								autoComplete='off'
								onChange={(e) => setName(e.target.value)}
								value={name}
								required
								aria-invalid={validName ? 'false' : 'true'}
								aria-describedby='uidnote'
							/>
							<div htmlFor='name' className='form-icon'>
								<FontAwesomeIcon
									icon={faCheck}
									className={validName ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={validName || !name ? 'hide' : 'invalid'}
								/>
							</div>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								id='uidnote'
								className={name && !validName ? 'instructions' : 'offscreen'}
							>
								{nameSurnameRules.find((rule) => rule.test(name))?.message ||
									''}
							</motion.p>
						</div>
					</div>

					<div className='relative-position centerLineAnimation'>
						<div>
							<input
								type='text'
								placeholder={t('Authentication.Surname')}
								id='surname'
								className={validSurename || surname ? 'form-icon-active' : ''}
								autoComplete='off'
								onChange={(e) => setSurname(e.target.value)}
								value={surname}
								required
								aria-invalid={validSurename ? 'false' : 'true'}
								aria-describedby='uidnote'
							/>
							<div htmlFor='surname' className='form-icon'>
								<FontAwesomeIcon
									icon={faCheck}
									className={validSurename ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={validSurename || !surname ? 'hide' : 'invalid'}
								/>
							</div>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								id='uidnote'
								className={
									surname && !validSurename ? 'instructions' : 'offscreen'
								}
							>
								{nameSurnameRules.find((rule) => rule.test(surname))?.message ||
									''}
							</motion.p>
						</div>
					</div>
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
				<div className='twoInputAreas'>
					{/* nationalID input */}
					<div>
						<div className='centerLineAnimation relative-position'>
							<input
								type='text'
								placeholder={t('Authentication.UserId')}
								id='nationalID'
								className={
									validNationalID || nationalID ? 'form-icon-active' : ''
								}
								autoComplete='off'
								onChange={(e) => setNationalID(e.target.value)}
								value={nationalID}
								required
								aria-invalid={validNationalID ? 'false' : 'true'}
								aria-describedby='uidnote'
							/>
							<div htmlFor='nationalID' className='form-icon'>
								<FontAwesomeIcon
									icon={faCheck}
									className={validNationalID ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={
										validNationalID || !nationalID ? 'hide' : 'invalid'
									}
								/>
							</div>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								id='uidnote'
								className={
									nationalID && !validNationalID ? 'instructions' : 'offscreen'
								}
							>
								{nationalIDrules.find((rule) => rule.test(nationalID))
									?.message || ''}
							</motion.p>
						</div>
					</div>

					<div className='relative-position centerLineAnimation'>
						<input
							value={birthDate}
							placeholder={i18n.language === 'tr' ? 'GG/AA/YYYY' : 'DD/MM/YYYY'}
							onChange={(e) => handleBirthDate(e)}
						></input>
						<motion.p
							initial='hidden'
							variants={descending}
							whileInView='show'
							id='uidnote'
							className={birthDateError ? 'instructions' : 'offscreen'}
						>
							{birthDateError}
						</motion.p>
					</div>
				</div>

				<div className='relative-position centerLineAnimation'>
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
							? i18n.language === 'en'
								? 'Not matching.'
								: 'Eşleştirilemedi.'
							: 'Must match the first password input field'}
					</motion.p>
				</div>

				<div className='authentication-button-container'>
					<Button
						disabled={
							!validName ||
							!validPwd ||
							!validMatch ||
							!validName ||
							!validBirthDate ||
							!validNationalID
								? true
								: false
						}
						type='submit'
						isLoading={isLoading || localLoading}
					>
						{i18n.language === 'en' ? 'Sign Up' : 'Kaydol'}
					</Button>
					<Link to='/login' className='fs-400 text-align-right text-container'>
						{t('Authentication.Redirect.0')}
					</Link>
				</div>
				<HoneypotInput />
			</form>
			<AuthenticationGreet />
		</div>
	);
}
export default RegisterForm;
