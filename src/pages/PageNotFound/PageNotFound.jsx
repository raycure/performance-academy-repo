import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
function PageNotFound() {
	const { t, i18n } = useTranslation('translation');
	return (
		<div>
			<div
				style={{
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '90%',
					overflow: 'hidden',
				}}
			>
				<p
					style={{
						fontSize: 'clamp(10rem, 20rem, 20vw)',
						fontWeight: 'bolder',
						textAlign: 'center',
						color: 'transparent',
						backgroundImage: 'url(/pagenotfound.jpg)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
					}}
					className='page-not-found-404'
				>
					404
				</p>
			</div>
			<div
				style={{
					position: 'relative',
					top: '-50px',
					display: 'flex',
					flexDirection: 'column',
					gap: '0.7rem',
				}}
			>
				<p
					className='fs-minimal-heading'
					style={{ textAlign: 'center', fontWeight: 'bolder' }}
				>
					{t('PageNotFound.Heading')}
				</p>
				<p style={{ textAlign: 'center' }}>{t('PageNotFound.Text')}</p>
				<div style={{ margin: '1.5rem auto', maxWidth: 'fit-content' }}>
					<Link
						to='/'
						style={{ padding: '1rem 2rem', borderRadius: '2rem' }}
						className='bg-accent-400'
					>
						{t('PageNotFound.Button')}
					</Link>
				</div>
			</div>
		</div>
	);
}
export default PageNotFound;
