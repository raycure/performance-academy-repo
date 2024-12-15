import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import '../../pages/Process/Process.css';
function LicenceContactRedirect() {
	const { i18n, t } = useTranslation('translation');
	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1.5rem',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			className='process-contact-con bg-primary-300'
		>
			<p>{t('Process.Contact')}</p>
			<HashLink
				to='/iletişim#contact-form-grad'
				smooth
				style={{
					display: 'flex',
					gap: '0.3rem',
					width: 'fit-content',
				}}
				className='process-contact-link addLineAnimation'
			>
				{i18n.language === 'en' ? 'Contact Us Here' : 'Bizimle İletişime Geçin'}
				<IoMdArrowRoundForward
					style={{
						position: 'relative',
						top: '2px',
						width: '1.2rem',
						height: '100%',
					}}
					className='process-contact-icon'
				/>
			</HashLink>
		</section>
	);
}
export default LicenceContactRedirect;
