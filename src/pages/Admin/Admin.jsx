import { useRef, useState } from 'react';
import { AuthService } from '../../auth/auth.service';
import { selectIsLoading } from '../../redux/auth/authStateSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Admin = () => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState('');
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [adminUsername, setAdminUsername] = useState('');
	const userRef = useRef();
	const [localLoading, setLocalLoading] = useState(false);
	const [loginError, setLoginError] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoginError(null);

		try {
			const loginData = {
				adminUsername,
				password,
			};

			const response = await dispatch(
				AuthService({
					data: loginData,
					method: 'POST',
					endpoint: '/adminLogin',
				})
			);

			if (response.payload && response.payload.success) {
				setLocalLoading(response.payload.data.message);
			} else {
				setLoginError(response.payload.data.message || 'Login failed');
			}
		} catch (error) {
			setLoginError(
				error.payload.data.message ||
					'Login failed server didnt return a message'
			);
			console.error('Login error:', error);
		}
	}
	return (
		<form onSubmit={handleSubmit} className='authentication-form'>
			<div>
				<input
					type='text'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setAdminUsername(e.target.value)}
					value={adminUsername}
					required
					placeholder='admin username'
				/>
			</div>
			<div>
				<input
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
					placeholder='admin password'
				/>
			</div>

			<div>
				<button isLoading={localLoading || isLoading}>login</button>
			</div>
			{loginError && <div>{loginError}</div>}
		</form>
	);
};

export default Admin;
