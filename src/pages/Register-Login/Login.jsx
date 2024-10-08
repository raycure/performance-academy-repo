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
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		if (isLoggedIn === 'true') {
			navigate('/');
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginData = { email: mail, password: pwd };
			const response = await dispatch(login({ loginData }));
			const accessToken = response.payload.accessToken;
			localStorage.setItem('accessToken', accessToken);
			const isLoggedIn = response ? true : false; //todo change it to user roles and stuff
			localStorage.setItem('isLoggedIn', isLoggedIn);
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
			console.log('err', err);

			err.payload.data === undefined // todo find a way to listen for no internet connection
				? setErrMsg('int baglanti falan')
				: setErrMsg(err.payload?.data?.message);
		}
	};

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
						<Button isLoading={localLoading || isLoading}> Giriş Yapın</Button>
						<p
							ref={errRef}
							className={errMsg ? 'errmsg' : 'errmsg'} // todo wth
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
		</>
	);
}

export default Login;
