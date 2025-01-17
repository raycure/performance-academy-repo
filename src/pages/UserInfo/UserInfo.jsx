import React, { useEffect, useRef, useState } from 'react';
import '../Register-Login/formStyle.css';
import './UserInfo.css';
import { FaEdit } from 'react-icons/fa';
import { BsExclamationLg } from 'react-icons/bs';
import { RxCheckCircled } from 'react-icons/rx';
import { GrDocumentUpdate } from 'react-icons/gr';
import { GrDocumentVerified } from 'react-icons/gr';
import { FaSave } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ImCancelCircle } from 'react-icons/im';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { descending } from '../../components/animations/AnimationValues';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../auth/auth.service';
import { useNavigate } from 'react-router-dom';
import { GrDocumentPdf } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import HoneypotInput from '../../components/Forms/HoneypotInput';
import axios from '../api/axios';
import PopupDialog from '../../components/Notification/Popup';
import contractPdf from '../../assets/LesmillsEgitmenSozlesmesi.pdf';
function UserInfo() {
	const dispatch = useDispatch();

	useEffect(() => {
		initUserInfo();
	}, []);

	const [sendEmailCooldown, setSendEmailCooldown] = useState(0);
	const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(false);
	useEffect(() => {
		let timer;
		if (sendEmailCooldown > 0) {
			timer = setInterval(() => {
				setSendEmailCooldown((prev) => prev - 1);
			}, 1000);
		} else {
			setIsSendEmailDisabled(false);
		}
		return () => clearInterval(timer);
	}, [sendEmailCooldown]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	async function sendVerificationMail() {
		setIsSendEmailDisabled(true);
		setSendEmailCooldown(120); // 2 minutes in seconds
		const response = await dispatch(
			AuthService({
				method: 'POST',
				endpoint: '/userInfo/sendVerificationMail',
				data: { name, surname, email: mail },
			})
		);
		return response;
	}

	const editingRef = useRef(null);
	const initUserInfo = async () => {
		try {
			const response = await dispatch(
				AuthService({
					method: 'GET',
					endpoint: '/userInfo',
				})
			);
			const user = response.payload.data.foundUser;
			const date = new Date(user.birthDate);
			const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
			const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and add leading zero
			const year = date.getFullYear();

			setMail(user.email);
			setName(user.name);
			setSurname(user.surname);
			setBirthDate(day + '/' + month + '/' + year);
			setUserId(user._id);
			setNationalID(user.nationalID);
			setContractverified(user.verifiedContract);
			setVerifiedMail(user.verifiedMail);
			setValidMail(true);
		} catch (error) {
			navigate('/');
			console.log('userinfo fetch error', error);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const updateData = {
				name,
				surname,
				email: mail,
				...(password && password.trim() !== ''
					? { newPassword: password }
					: {}),
			};
			const response = await dispatch(
				AuthService({
					method: 'POST',
					endpoint: '/userInfo',
					data: { updateData },
				})
			);
			await initUserInfo();
			setIsEditing(false);
		} catch (error) {}
	}
	async function deleteAccount() {
		try {
			await dispatch(
				AuthService({
					method: 'POST',
					endpoint: '/userInfo/deleteAccount',
					data: { nationalID, email: mail },
				})
			);
			localStorage.removeItem('accessToken');
			navigate('/');
		} catch (error) {
			console.log("Couldn't delete account", error);
		}
	}

	const handleIsEditing = () => {
		setPassword('');
		setMatchPassword('');
		setIsEditing(true);
	};

	async function handleLogout() {
		const response = await dispatch(
			AuthService({ endpoint: '/logout', method: 'POST' })
		);
		localStorage.removeItem('accessToken');
		navigate('/');
	}
	const { t, i18n } = useTranslation('translation');
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [contractverified, setContractverified] = useState(null);
	const [verifiedMail, setVerifiedMail] = useState(null);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [nationalID, setNationalID] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [userId, setUserId] = useState('');
	const [mail, setMail] = useState('');
	const [validName, setValidName] = useState('');
	const [validSurname, setValidSurname] = useState('');
	const [validMail, setValidMail] = useState('');
	const [passwordOn, setPasswordOn] = useState(true);
	const [matchPasswordOn, setMatchPasswordOn] = useState(true);
	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');
	const [validPassword, setValidPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');
	const [fileName, setFileName] = useState(null);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFileName(selectedFile ? selectedFile.name : null);

		if (selectedFile && selectedFile.type !== 'application/pdf') {
			setMessage(
				i18n.language === 'en'
					? 'Please select a PDF file.'
					: 'Lütfen bir PDF dosyası seçiniz.'
			);
			setFile(null);
		} else {
			setMessage('');
			setFile(selectedFile);
		}
	};

	const displayInputAreaWarning = () => {
		const verifyNotif = {
			type: 'warning',
			duration: 3000,
			message:
				i18n.language === 'en'
					? 'If you want to change your ID or birth date, please contact our support team.'
					: 'Eğer kimlik bilgilerinizi veya doğum tarihinizi değiştirmek istiyorsanız, lütfen destek ekibimizle iletişime geçin.',
			link: 'https://infopfa.com/ileti%C5%9Fim',
		};
		displayNotif(verifyNotif);
	};
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
	const mailRules = [
		{
			test: (mail) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail),
			message:
				i18n.language === 'en'
					? 'Mail must be a valid email address.'
					: 'Geçerli bir e-posta formatında olmalıdır.',
		},
		{
			test: (mail) => mail.length > 50,
			message:
				i18n.language === 'en'
					? 'Mail must not exceed 50 characters.'
					: '50 karakteri geçmemelidir.',
		},
	];
	const passwordValidationRules = [
		{
			test: (password) => !/(?=.*[a-z])(?=.*[A-Z])/.test(password),
			message: t('Authentication.Validation.Password.0'),
		},
		{
			test: (password) => !/(?=.*\d)/.test(password),
			message: t('Authentication.Validation.Password.1'),
		},
		{
			test: (password) => /\s/.test(password),
			message: t('Authentication.Validation.Password.2'),
		},
		{
			test: (password) =>
				!/^[a-zA-Z\d~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'\.,:;]+$/.test(
					password
				),
			message: t('Authentication.Validation.Password.3'),
		},
		{
			test: (password) => password.length < 8 || password.length >= 24,
			message: t('Authentication.Validation.Password.4'),
		},
	];
	useEffect(() => {
		const valid = nameSurnameRules.every((rule) => !rule.test(name));
		setValidName(valid);
	}, [name]);

	useEffect(() => {
		const valid = nameSurnameRules.every((rule) => !rule.test(surname));
		setValidSurname(valid);
	}, [surname]);

	useEffect(() => {
		const valid = mailRules.every((rule) => !rule.test(mail));
		setValidMail(valid);
	}, [mail]);

	useEffect(() => {
		const valid = passwordValidationRules.every((rule) => !rule.test(password));
		setValidPassword(valid);
	}, [password]);

	useEffect(() => {
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	const handleEditing = (e) => {
		if (!isEditing) {
			e.target.blur();
			const verifyNotif = {
				type: 'warning',
				duration: 2000,
				message:
					i18n.language === 'en'
						? 'Please click the edit button first.'
						: 'Lütfen önce düzenleme düğmesine tıklayın.',
			};
			displayNotif(verifyNotif);
			if (editingRef.current) {
				editingRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}
	};
	async function handleFileSend() {
		try {
			if (!file) {
				return null;
			}
			const formData = new FormData(); // formdata is a built in browser API it automatically handle the chunking of files
			formData.append('file', file);
			formData.append('userId', userId);
			const response = await axios.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			const verifyNotif = {
				type: 'success',
				duration: 3000,
				message: 'file uploaded successfully',
			};
			displayNotif(verifyNotif);
			setContractverified('pending');
		} catch (error) {
			const verifyNotif = {
				type: 'error',
				duration: 3000,
				message: error.response.data.message,
			};
			displayNotif(verifyNotif);
		}
	}
	const displayNotif = (Notifexp) => {
		localStorage.setItem('Notifexp', JSON.stringify(Notifexp));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	};

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const handleProceed = () => {
		setIsPopupOpen(false);
		deleteAccount();
	};
	const handleCancel = () => {
		setIsPopupOpen(false);
	};

	async function handleContractDownload() {
		try {
			const link = document.createElement('a');
			link.href = contractPdf;
			link.download =
				i18n.language === 'en'
					? 'Lesmills Trainer Agreement.pdf'
					: 'Lesmills Eğitmen Sözleşmesi.pdf'; // changes how the user sees the file
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error downloading PDF:', error);
		}
	}
	return (
		<div className='user-info-page'>
			<div className='user-info-inner-con user-info-title-con'>
				<div>
					<p className='fs-minimal-heading' style={{ fontWeight: 'bolder' }}>
						{i18n.language === 'en' ? 'Your Account' : 'Hesabınız'}
					</p>
					<p>
						{i18n.language === 'en'
							? 'See or edit information on this page.'
							: 'Bilgilerinizi bu sayfadan değiştirin veya kontrol edin.'}
					</p>
				</div>
				<button
					style={{ display: 'flex', width: 'fit-content' }}
					onClick={handleIsEditing}
					className={`${!isEditing ? '' : 'display-hidden'} user-info-edit-btn`}
					ref={editingRef}
				>
					{i18n.language === 'en' ? 'Edit' : 'Düzenle'}
					<FaEdit
						style={{
							position: 'relative',
							top: '2px',
							marginLeft: '0.5rem',
							width: '1.2rem',
						}}
					/>
				</button>
				<button
					style={{ color: '#ef3f3f', display: 'flex', width: 'fit-content' }}
					onClick={() => setIsEditing(false)}
					className={`${isEditing ? '' : 'display-hidden'} user-info-edit-btn`}
				>
					{i18n.language === 'en' ? 'Cancel Changes' : 'İptal Et'}
					<ImCancelCircle
						style={{
							position: 'relative',
							top: '4px',
							marginLeft: '0.4rem',
							width: '1rem',
						}}
					/>
				</button>
			</div>
			<div className='user-info-inner-con'>
				<p className='fs-650' style={{ fontWeight: 'bolder' }}>
					{i18n.language === 'en' ? 'Personal Information' : 'Kişisel Bilgiler'}
				</p>
				<p>
					{i18n.language === 'en'
						? 'Manage your personal information.'
						: 'Kişisel bilgilerinizi düzenleyin'}
				</p>
				<div className='user-info-grid'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
					>
						<label htmlFor='name'>
							{i18n.language === 'en' ? 'Name' : 'İsim'}
						</label>
						<div className='relative-position'>
							<input
								autoComplete='off'
								readOnly={!isEditing}
								type='text'
								id='name'
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								onClick={handleEditing}
								className={` ${isEditing ? 'form-icon-active' : ''}`}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validName || !name || !isEditing ? 'hide' : 'invalid'
								}
							/>
							<FontAwesomeIcon
								icon={faCheck}
								className={validName && isEditing ? 'valid' : 'hide'}
							/>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								className={!validName && name ? 'instructions' : 'offscreen'}
							>
								{nameSurnameRules.find((rule) => rule.test(name))?.message ||
									''}
							</motion.p>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
					>
						<label htmlFor='surname'>
							{i18n.language === 'en' ? 'Surname' : 'Soyad'}
						</label>
						<div className='relative-position'>
							<input
								autoComplete='off'
								readOnly={!isEditing}
								type='text'
								id='surname'
								value={surname}
								name='surname'
								onChange={(e) => setSurname(e.target.value)}
								onClick={handleEditing}
								className={` ${
									!validSurname || (surname && isEditing)
										? 'form-icon-active'
										: ''
								}`}
							/>
							<FontAwesomeIcon
								icon={faCheck}
								className={validSurname && isEditing ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validSurname || !surname || !isEditing ? 'hide' : 'invalid'
								}
							/>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								className={
									!validSurname && surname ? 'instructions' : 'offscreen'
								}
							>
								{nameSurnameRules.find((rule) => rule.test(surname))?.message ||
									''}
							</motion.p>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: 'not-allowed',
						}}
					>
						<label htmlFor='nationalID'>
							{i18n.language === 'en' ? 'TR Government ID' : 'TC Kimlik No'}
						</label>

						<div className='relative-position'>
							<input
								onClick={displayInputAreaWarning}
								autoComplete='off'
								readOnly='true'
								type='text'
								id='nationalID'
								name='nationalID'
								value={nationalID}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: 'not-allowed',
						}}
					>
						<label htmlFor='birthDate'>
							{i18n.language === 'en' ? 'Birth Date' : 'Doğum Tarihi'}
						</label>
						<div className='relative-position'>
							<input
								autoComplete='off'
								onClick={displayInputAreaWarning}
								value={birthDate}
								readOnly={true}
								placeholder={
									i18n.language === 'tr' ? 'GG/AA/YYYY' : 'DD/MM/YYYY'
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='user-info-inner-con'>
				<p className='fs-650' style={{ fontWeight: 'bolder' }}>
					{i18n.language === 'en' ? 'Account Information' : 'Hesap Bilgileri'}
				</p>
				<p>
					{i18n.language === 'en'
						? 'Manage your account information.'
						: 'Hesap bilgilerinizi düzenleyin.'}
				</p>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<label htmlFor='mail'>Email</label>
					<div className='relative-position' style={{ width: '55%' }}>
						<FontAwesomeIcon
							icon={faCheck}
							className={validMail && isEditing ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validMail || !mail || isEditing ? 'hide' : 'invalid'}
						/>
						<input
							autoComplete='off'
							readOnly={!isEditing}
							type='text'
							id='mail'
							name='mail'
							value={mail}
							onChange={(e) => setMail(e.target.value)}
							style={{
								cursor: isEditing ? 'pointer' : 'not-allowed',
							}}
							onClick={handleEditing}
							className={` ${isEditing ? 'form-icon-active' : ''}`}
						/>

						{!verifiedMail && (
							<div>
								{sendEmailCooldown > 0 ? (
									<p>
										{i18n.language === 'en'
											? 'Resend in:'
											: 'Tekrar yollamak için kalan:'}{' '}
										{formatTime(sendEmailCooldown)}
									</p>
								) : (
									<button
										onClick={sendVerificationMail}
										disabled={isSendEmailDisabled}
									>
										{i18n.language === 'en'
											? 'Send verification email'
											: "Doğrulama email'i yollayın"}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
				{isEditing && (
					<>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<label htmlFor='password'>
								{i18n.language === 'en' ? 'New password' : 'Yeni parola'}
							</label>
							<div
								style={{
									display: 'flex',
								}}
								className='relative-position'
							>
								<FontAwesomeIcon
									icon={faCheck}
									className={validPassword && isEditing ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={
										validPassword || (!password && isEditing)
											? 'hide'
											: 'invalid'
									}
								/>
								<input
									autoComplete='off'
									readOnly={!isEditing}
									type={passwordOn ? 'password' : 'text'}
									id='password'
									name='password'
									onChange={(e) => setPassword(e.target.value)}
									style={{
										cursor: isEditing ? 'pointer' : 'not-allowed',
										width: '55%',
									}}
									onClick={handleEditing}
									className={` ${password ? 'form-icon-active' : ''}`}
								/>
								<button
									style={{ margin: 'auto 0.5rem' }}
									onClick={() => setPasswordOn(!passwordOn)}
								>
									{passwordOn ? (
										<IoEyeOff
											style={{
												display: 'inline-block',
												width: '1.3rem',
												height: '100%',
												flexShrink: '0',
												position: 'relative',
												top: '4px',
											}}
										/>
									) : (
										<IoEye
											style={{
												display: 'inline-block',
												width: '1.3rem',
												height: '100%',
												flexShrink: '0',
												position: 'relative',
												top: '4px',
											}}
										/>
									)}
								</button>
							</div>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								className={
									!validPassword && password ? 'instructions' : 'offscreen'
								}
							>
								{passwordValidationRules.find((rule) => rule.test(password))
									?.message || ''}
							</motion.p>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<label htmlFor='matchPassword'>
								{i18n.language === 'en'
									? 'Confirm new password'
									: 'Yeni parolayı onayla'}
							</label>
							<div
								style={{
									display: 'flex',
								}}
								className='relative-position'
							>
								<FontAwesomeIcon
									icon={faCheck}
									className={
										validMatch && matchPassword && validPassword
											? 'valid'
											: 'hide'
									}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={
										(!validMatch || !password || !validPassword) &&
										matchPassword
											? 'invalid'
											: 'hide'
									}
								/>
								<input
									autoComplete='off'
									readOnly={!isEditing}
									type={matchPasswordOn ? 'password' : 'text'}
									id='matchPassword'
									name='matchPassword'
									onChange={(e) => setMatchPassword(e.target.value)}
									style={{
										width: '55%',
										cursor: isEditing ? 'pointer' : 'not-allowed',
									}}
									onClick={handleEditing}
									className={` ${
										validPassword || password ? 'form-icon-active' : ''
									}`}
								/>
								<button
									style={{ margin: 'auto 0.5rem' }}
									onClick={() => setMatchPasswordOn(!matchPasswordOn)}
								>
									{matchPasswordOn ? (
										<IoEyeOff
											style={{
												display: 'inline-block',
												width: '1.3rem',
												height: '100%',
												flexShrink: '0',
												position: 'relative',
												top: '4px',
											}}
										/>
									) : (
										<IoEye
											style={{
												display: 'inline-block',
												width: '1.3rem',
												height: '100%',
												flexShrink: '0',
												position: 'relative',
												top: '4px',
											}}
										/>
									)}
								</button>
							</div>

							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								className={
									(!validMatch || !password || !validPassword) && matchPassword
										? 'instructions'
										: 'offscreen'
								}
							>
								{!validMatch && i18n.language === 'en'
									? 'Not matching.'
									: 'Eşleştirilemedi.'}
							</motion.p>
						</div>
					</>
				)}
			</div>
			<div
				className='user-select-none user-info-inner-con'
				style={{ gap: '0.5rem', display: 'flex', flexDirection: 'column' }}
			>
				<p className='fs-650' style={{ fontWeight: 'bolder' }}>
					{i18n.language === 'en' ? 'Instructor Contract' : 'Eğitmen Sözlemesi'}
				</p>
				<p>
					{i18n.language === 'en'
						? 'To participate in our training events, you must first complete and upload the instructor agreement. You cannot receive a certificate until your agreement is verified. Additionally, you cannot re-upload the agreement while it is under review.'
						: 'Eğitim etkinliklerimize katılabilmeniz için öncelikle eğitmen sözleşmemizi doldurup yüklemeniz gerekmektedir. Sözleşmeniz doğrulanmadan sertifika alamazsınız. Ayrıca, sözleşmeniz inceleme aşamasındayken tekrar yükleme yapamazsınız.'}
				</p>
				{contractverified === 'passed' && (
					<p style={{ color: 'green', display: 'flex' }}>
						<RxCheckCircled
							style={{
								position: 'relative',
								top: '4px',
								height: '100%',
								width: '1rem',
								marginRight: '0.3rem',
								flexShrink: '0',
							}}
						/>{' '}
						{i18n.language === 'en'
							? 'We have verified your instructor contract.'
							: 'Antrenör sözleşmeniz doğrulanmıştır.'}
					</p>
				)}
				{contractverified === 'failed' && (
					<p style={{ color: '#ef3f3f', display: 'flex' }}>
						<BsExclamationLg
							style={{
								position: 'relative',
								top: '3px',
								width: '1rem',
								marginRight: '0.3rem',
								flexShrink: '0',
							}}
						/>
						{i18n.language === 'en'
							? "We couldn't verify your instructor contract, please fill and upload your contract once more."
							: 'Antrenör sözleşmenizi doğrulayamadık, lütfen sözleşmenizi tekrardan doldurup yükleyiniz.'}
					</p>
				)}
				{contractverified === 'pending' && (
					<p style={{ color: 'gray', display: 'flex' }}>
						<FaArrowRotateRight
							style={{
								position: 'relative',
								top: '4px',
								height: '100%',
								width: '1rem',
								marginRight: '0.3rem',
								flexShrink: '0',
							}}
						/>{' '}
						{i18n.language === 'en'
							? 'Instructor Contract Under Review...'
							: 'Antrenör Sözleşmesi Kontrol Ediliyor...'}
					</p>
				)}
				{contractverified === 'failed' || contractverified === 'null' ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<span className='input-outer-container'>
							<input
								type='file'
								name='file'
								id='file'
								className='inputfile'
								onChange={handleFileChange}
								accept='application/pdf'
							/>
							<label htmlFor='file'>
								<p>
									{fileName === null ? (
										<GrDocumentUpdate
											style={{
												display: 'inline-block',
												marginRight: '0.5rem',
												position: 'relative',
												top: '2px',
												flexShrink: 'none',
											}}
										/>
									) : (
										<GrDocumentVerified
											style={{
												display: 'inline-block',
												marginRight: '0.5rem',
												position: 'relative',
												top: '2px',
												flexShrink: 'none',
											}}
										/>
									)}
									{fileName === null
										? i18n.language === 'en'
											? 'Choose a File...'
											: 'Dosya Seçin...'
										: fileName.length > 10
										? `${fileName.substring(0, 10)}...`
										: fileName}
								</p>
							</label>
							<button
								onClick={handleFileSend}
								disabled={fileName === null}
								type='button'
							>
								{i18n.language === 'en' ? 'Save' : 'Kaydet'}
							</button>
						</span>
						{fileName === null && (
							<Link
								style={{ textDecoration: 'underline', width: 'max-content' }}
								onClick={handleContractDownload}
							>
								{i18n.language === 'en'
									? 'Click For The Instructor Contract '
									: 'Eğitmen Sözleşmesi İçin Tıklayınız '}
								<GrDocumentPdf
									style={{
										display: 'inline-block',
										position: 'relative',
										top: '2px',
									}}
								/>
							</Link>
						)}
					</div>
				) : null}
			</div>
			<div style={{ margin: '1rem 0' }}>
				<div className='user-info-btn-con'>
					<button className='user-info-btn' onClick={handleLogout}>
						<IoLogOutOutline
							style={{
								position: 'relative',
								width: '1.3rem',
								height: '100%',
								flexShrink: '0',
							}}
						/>
						{i18n.language === 'en' ? 'Log out' : 'Çıkış Yapın'}
					</button>
					<button
						className='user-info-btn user-delete-btn'
						onClick={() => setIsPopupOpen(true)}
					>
						<MdDeleteForever
							style={{
								position: 'relative',
								width: '1.3rem',
								height: '100%',
								flexShrink: '0',
							}}
						/>
						{i18n.language === 'en' ? 'Delete Account' : 'Hesabınızı Silin'}
					</button>
					<PopupDialog
						isOpen={isPopupOpen}
						onCancel={handleCancel}
						onProceed={handleProceed}
						message='Are you sure you want to continue?'
					/>
					<button
						className={`user-info-btn ${isEditing ? '' : 'display-hidden'}`}
						onClick={handleSubmit}
					>
						<FaSave
							style={{
								position: 'relative',
								width: '1.1rem',
								height: '100%',
								flexShrink: '0',
							}}
						/>
						{i18n.language === 'en'
							? 'Save Changes'
							: 'Değişiklikleri Kaydedin'}
					</button>
				</div>
			</div>
			<HoneypotInput />
		</div>
	);
}
export default UserInfo;
