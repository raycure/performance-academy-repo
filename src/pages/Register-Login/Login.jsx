import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios.js';
import { login } from '../../auth/auth.service.js';
import AuthenticationGreet from './AuthenticationGreet.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './formStyle.css';
import Button from '../../components/Button/Button.jsx';
import logo from '../../assets/LesmillsLogo.png';
import { selectIsLoading } from '../../redux/auth/authStateSlice.js';

function Login() {
	const userRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();
	let isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const [mail, setMail] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);
	useEffect(() => {
		console.log('errMsg degisti', errMsg);

		errRef.current.focus();
	}, [errMsg]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginData = { email: mail, password: pwd };
			const response = await dispatch(login({ loginData }));
			const accessToken = response.accessToken;
			localStorage.setItem('accessToken', accessToken);
			setMail('');
			setPwd('');
			setSuccess(true);
			setLocalLoading(true);

			setTimeout(() => {
				navigate('/');
			}, 5000);
		} catch (err) {
			if (err.response?.status === 429) {
				setErrMsg('Too many requests, please try again later.');
			}
			err.payload.data === undefined // if the req fails assumed no connection.
				? setErrMsg('int baglanti falan')
				: setErrMsg(err.payload?.data?.message);
		}
	};

	async function handleSub() {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await axios.get('/test', {
				withCredentials: true,
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			console.log('response login.jsx: ', response.status);
		} catch (err) {
			if (err.response.status === 401 || err.response.status === 403) {
				console.log(
					'Token expired or unauthorized, attempting to refresh token...'
				);
				const refreshResponse = await axios.get('/refresh', {
					withCredentials: true,
				});
				const newAccessToken = refreshResponse.data.accessToken;
				localStorage.setItem('accessToken', newAccessToken);
				response = await axios.get('/test', {
					withCredentials: true,
					headers: { Authorization: `Bearer ${newAccessToken}` },
				});
			}
		}
	}

	async function handleLogout() {
		console.log({
			accessToken: localStorage.getItem('accessToken'),
		});
		const response = await axios.post(
			'/logout',
			{},
			{
				withCredentials: true,
			}
		);
		console.log(response);

		if (response.status === 200) {
			localStorage.removeItem('accessToken');
		}
	}
	return (
		<>
			{/* {success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<a href='#'>Go to Home</a>
					</p>
				</section>
			) : ( */}
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
					<h1>Giriş Yapın</h1>
					<div className='centerLineAnimation'>
						<input
							type='email'
							id='email'
							ref={userRef}
							autoComplete='off'
							onChange={(e) => setMail(e.target.value)}
							value={mail}
							required
							placeholder='Email'
						/>
					</div>
					<div className='centerLineAnimation'>
						<input
							type='password'
							id='password'
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							placeholder='Şifre'
						/>
					</div>
					<Link>maili tekrar yollamak icin tiklayin</Link>

					<div className='authentication-button-container'>
						<Button isLoading={localLoading || isLoading} classProp={'test'}>
							{' '}
							Giriş Yapın
						</Button>
						<p
							ref={errRef}
							className={errMsg ? 'errmsg' : 'errmsg'}
							aria-live='assertive'
						>
							{errMsg}
						</p>
					</div>
					<Link to='/register' className='fs-400'>
						Bir hesabınız yok mu? Buradan kaydolun!
					</Link>
				</form>
				<AuthenticationGreet />
			</div>
			{/* )} */}
		</>
	);
}

export default Login;
