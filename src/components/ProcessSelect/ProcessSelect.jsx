import React, { useState } from 'react';
import '../../pages/Process/Process.css';
import { useTranslation } from 'react-i18next';

function ProcessSelect() {
	const { i18n, t } = useTranslation('translation');
	const [selectedProcess, setSelectedProcess] = useState(true);
	return (
		<div className='process-select-outer-con'>
			<div className='process-select-button-con'>
				<button
					className={selectedProcess === true ? 'active' : 'inactive'}
					onClick={() => setSelectedProcess(true)}
				>
					<p>
						{i18n.language === 'en' ? 'Operational System' : 'İşletme Sistemi'}
					</p>
				</button>
				<button
					className={selectedProcess === false ? 'active' : 'inactive'}
					onClick={() => setSelectedProcess(false)}
				>
					<p>{i18n.language === 'en' ? 'Hybrid System' : 'Hibrit Sistem'}</p>
				</button>
			</div>
			<div className='process-text-con'>
				{selectedProcess === true ? (
					<div>
						<p>{t('Process.Operation')}</p>
					</div>
				) : (
					<div>
						<p>{t('Process.Hybrid')}</p>
					</div>
				)}
			</div>
		</div>
	);
}
export default ProcessSelect;
