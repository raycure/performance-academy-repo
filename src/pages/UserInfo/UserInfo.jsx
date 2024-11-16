import React, { useEffect, useState } from 'react';
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

function UserInfo() {
	const dispatch = useDispatch();
	useEffect(() => {
		makeApiCall();
	}, []);

	const makeApiCall = async () => {
		const response = await dispatch(
			AuthService({
				method: 'GET',
				endpoint: '/userInfo',
			})
		);
		const user = response.payload.data.foundUser;

		if (response.payload.data.newAccessToken) {
			const newAccessToken = response.payload.data.newAccessToken;
			localStorage.setItem('accessToken', newAccessToken);
		}
		const date = new Date(user.birthDate);
		const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and add leading zero
		const year = date.getFullYear();

		setMail(user.email);
		setNationalID(user.nationalID);
		setName(user.name);
		setSurname(user.surname);
		setBirthDate(day + '/' + month + '/' + year);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const updateData = {
			name,
			surname,
			nationalID,
			birthDate,
			email: mail,
		};
		const response = await dispatch(
			AuthService({
				method: 'POST',
				endpoint: '/userInfo',
				data: { updateData },
			})
		);

		console.log('update response', response);
	}

	const { t, i18n } = useTranslation('translation');
	const contractverified = false;
	const [isEditing, setIsEditing] = useState(false);
	const [passwordOn, setPasswordOn] = useState(true);
	const [fileName, setFileName] = useState(null);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFileName(file ? file.name : null);
	};
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [nationalID, setNationalID] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [forApiBirthDate, setForApiBirthDate] = useState('');

	const [birthDateError, setBirthDateError] = useState('');
	const [validName, setValidName] = useState('');
	const [validSurname, setValidSurname] = useState('');
	const [validNationalId, setValidNationalId] = useState('');
	const [validBirthDate, setValidBirthDate] = useState('');
	const [validMail, setValidMail] = useState('');
	const [validPassword, setValidPassword] = useState('');

	const nameSurnameRules = [
		{
			test: (nameOrSurname) => !/^[a-zA-Z\s]+$/.test(nameOrSurname),
			message: t('Authentication.Validation.nameOrSurname.0'),
		},
		{
			test: (nameOrSurname) =>
				nameOrSurname.length < 3 || nameOrSurname.length >= 24,
			message: t('Authentication.Validation.nameOrSurname.1'),
		},
	];
	const idRules = [
		{
			test: (nationalID) => !/^\d+$/.test(nationalID),
			message: t('Authentication.Validation.UserId.0'),
		},
		{
			test: (nationalID) => nationalID.length !== 11,
			message: t('Authentication.Validation.UserId.1'),
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
	const birthDateRules = [
		{
			test: (birthDate) => isNaN(new Date(birthDate).getTime()),
			message:
				i18n.language === 'en'
					? 'Birth date must be a valid date.'
					: 'İstenen formatta yazılmalıdır.',
		},
	];
	const passwordRules = [
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
		const valid = nameSurnameRules.every((rule) => !rule.test(name));
		setValidName(valid);
	}, [name]);

	useEffect(() => {
		const valid = nameSurnameRules.every((rule) => !rule.test(surname));
		setValidSurname(valid);
	}, [surname]);

	useEffect(() => {
		const valid = idRules.every((rule) => !rule.test(nationalID));
		setValidNationalId(valid);
	}, [nationalID]);

	useEffect(() => {
		const valid = birthDateRules.every((rule) => !rule.test(birthDate));
		setValidBirthDate(valid);
	}, [birthDate]);

	useEffect(() => {
		const valid = mailRules.every((rule) => !rule.test(mail));
		setValidMail(valid);
	}, [mail]);

	useEffect(() => {
		const valid = passwordRules.every((rule) => !rule.test(password));
		setValidPassword(valid);
	}, [password]);

	const handleEditing = (e) => {
		if (!isEditing) {
			e.target.blur();
		}
	};

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
					setBirthDateError('invalid date');
					return;
				}
				if (
					parseInt(year) > currentYear ||
					(year.length === 4 && parseInt(year) < 1900)
				) {
					setBirthDateError('invalid year');
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
		<section className='user-info-page'>
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
					onClick={() => setIsEditing(true)}
					className={`${!isEditing ? '' : 'display-hidden'} user-info-edit-btn`}
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
						className={`relative-position ${
							validName || name ? 'form-icon-active' : ''
						}`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
					>
						<label htmlFor='name'>
							{i18n.language === 'en' ? 'Name' : 'İsim'}
						</label>
						<input
							readOnly={!isEditing}
							type='text'
							id='name'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							onClick={handleEditing}
						/>
						<div className='form-icon'>
							<FontAwesomeIcon
								icon={faCheck}
								className={validName ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validName || !name ? 'hide' : 'invalid'}
							/>
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
						<div
							className={`relative-position ${
								!validNationalId ? 'form-icon-active' : ''
							}`}
						>
							{/* soyad */}
							<input
								readOnly={!isEditing}
								type='text'
								id='surname'
								value={surname}
								name='surname'
								onChange={(e) => setSurname(e.target.value)}
								onClick={handleEditing}
							/>
							<div className='form-icon'>
								<FontAwesomeIcon
									icon={faCheck}
									className={validSurname ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={validSurname || !surname ? 'hide' : 'invalid'}
								/>
							</div>
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
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
					>
						<label htmlFor='nationalId'>
							{i18n.language === 'en' ? 'TR Government ID' : 'TC Kimlik No'}
						</label>

						<div
							className={`relative-position ${
								!validNationalId ? 'form-icon-active' : ''
							}`}
						>
							<input
								readOnly={!isEditing}
								type='text'
								id='nationalId'
								name='nationalId'
								onChange={(e) => setNationalID(e.target.value)}
								onClick={handleEditing}
								value={nationalID}
							/>
							<div className='form-icon'>
								<FontAwesomeIcon
									icon={faCheck}
									className={validNationalId ? 'valid' : 'hide'}
								/>
								<FontAwesomeIcon
									icon={faTimes}
									className={
										validNationalId || !nationalID ? 'hide' : 'invalid'
									}
								/>
							</div>
							<motion.p
								initial='hidden'
								variants={descending}
								whileInView='show'
								className={
									!validNationalId && nationalID ? 'instructions' : 'offscreen'
								}
							>
								{idRules.find((rule) => rule.test(nationalID))?.message || ''}
							</motion.p>
						</div>
					</div>
					{/* <div
						className={`relative-position ${
							validBirthDate || birthDate ? 'form-icon-active' : ''
						}`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
					>
						<label htmlFor='birthDate'>
							{i18n.language === 'en' ? 'Birth Date' : 'Doğum Tarihi'}
						</label>
						<input
							readOnly={!isEditing}
							type='text'
							id='birthDate'
							name='birthDate'
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							onClick={handleBirthDate}
						/>
						<div className='form-icon'>
							<FontAwesomeIcon
								icon={faCheck}
								className={validBirthDate ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validBirthDate || !birthDate ? 'hide' : 'invalid'}
							/>
						</div>
					</div> */}
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
					className={`relative-position ${
						validMail || mail ? 'form-icon-active' : ''
					}`}
				>
					<label htmlFor='mail'>Email</label>
					<input
						readOnly={!isEditing}
						type='text'
						id='mail'
						name='mail'
						value={mail}
						onChange={(e) => setMail(e.target.value)}
						style={{
							width: '70%',
							cursor: isEditing ? 'pointer' : 'not-allowed',
						}}
						onClick={handleEditing}
					/>
					<div
						className='form-icon'
						style={{ position: 'relative', bottom: '1.9rem' }}
					>
						<FontAwesomeIcon
							icon={faCheck}
							className={validMail ? 'valid' : 'hide'}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className={validMail || !mail ? 'hide' : 'invalid'}
						/>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<label htmlFor='password'>
						{i18n.language === 'en' ? 'Password' : 'Şifre'}
					</label>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
						}}
						className={`relative-position ${
							validPassword || password ? 'form-icon-active' : ''
						}`}
					>
						<input
							readOnly={!isEditing}
							type={passwordOn ? 'password' : 'text'}
							id='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							style={{
								width: '55%',
								cursor: isEditing ? 'pointer' : 'not-allowed',
							}}
							onClick={handleEditing}
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
						<div className='form-icon'>
							<FontAwesomeIcon
								icon={faCheck}
								className={validPassword ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPassword || !password ? 'hide' : 'invalid'}
							/>
						</div>
					</div>
				</div>
				<div className='user-info-contract-con'>
					{contractverified === true ? (
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
								? 'Instructor Contract Verified'
								: 'Antrenör Sözleşmesi Doğrulandı'}
						</p>
					) : contractverified === false ? (
						<p style={{ color: '#ef3f3f', display: 'flex' }}>
							<BsExclamationLg
								style={{
									position: 'relative',
									top: '3px',
									width: '1rem',
									marginRight: '0.3rem',
									flexShrink: '0',
								}}
							/>{' '}
							{i18n.language === 'en'
								? 'Instructor Contract Not Verified, Upload the Contract Again'
								: 'Antrenör Sözleşmesi Doğrulanamadı, Lütfen Tekrar Yükleyiniz'}
						</p>
					) : (
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
					{contractverified === false && (
						<>
							<input
								type='file'
								name='file'
								id='file'
								class='inputfile'
								onChange={handleFileChange}
								required
							/>
							<label
								htmlFor='file'
								onClick={(e) => !isEditing && e.preventDefault()}
							>
								<p>
									{fileName === null ? (
										<GrDocumentUpdate
											style={{
												display: 'inline-block',
												marginRight: '0.5rem',
												position: 'relative',
												top: '2px',
												flexShrink: '0',
											}}
										/>
									) : (
										<GrDocumentVerified
											style={{
												display: 'inline-block',
												marginRight: '0.5rem',
												position: 'relative',
												top: '2px',
												flexShrink: '0',
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
						</>
					)}
				</div>
			</div>
			<div style={{ margin: '1rem 0' }}>
				<p className='fs-650' style={{ fontWeight: 'bolder' }}>
					{i18n.language === 'en' ? 'Account Security' : 'Hesap Güvenliği'}
				</p>
				<p>
					{i18n.language === 'en'
						? 'Manage your account security.'
						: 'Hesap güvenliğinizi düzenleyin.'}
				</p>
				<div className='user-info-btn-con'>
					<button className='user-info-btn'>
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
					<button className='user-info-btn user-delete-btn'>
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
		</section>
	);
}
export default UserInfo;
