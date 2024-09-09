import React from 'react';
import './Loading.css';
import { useTranslation } from 'react-i18next';

function Loading() {
	const { t, i18n, ready } = useTranslation('translation');
	return (
		<div className='loading-container'>
			<div class='loader' />
			<p>{t('loadingText')}</p>
		</div>
	);
}
export default Loading;
