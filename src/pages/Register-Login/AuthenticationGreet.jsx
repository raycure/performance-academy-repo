import React from 'react';
import logo from '../../assets/LesmillsLogo.png';
function AuthenticationGreet() {
	return (
		<div>
			<img alt='logo' className='logo' src={logo}></img>
			<p className='fs-secondary-heading'>Merhabalar!</p>
			<p></p>
			<p className='text-legal'>
				Bir hesap oluşturduğunuzda, Kullanım Koşulları'nı kabul etmiş
				olursunuz.
			</p>
		</div>
	);
}
export default AuthenticationGreet;
