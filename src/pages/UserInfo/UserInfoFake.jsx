import React, { useState } from 'react';
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
function UserInfoFake() {
	const { t, i18n } = useTranslation('translation');
	const [fileName, setFileName] = useState(null);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFileName(file ? file.name : null);
	};
	const contractverified = false;
	return (
		<section className='user-info-page'>
			<div className='user-info-title-con'>
				<p></p>
				<div>
					<p>Düzenle</p>
					<button>
						<FaEdit />
					</button>
				</div>
			</div>
			<div className='user-info-personal-info-con'>
				<p>Personal Information</p>
				<label for='name'>Name</label>
				<input type='text' id='name' name='name' />
				<label for='surname'>Surname</label>
				<input type='text' id='surname' name='surname' />
				<label for='userId'>TR Government ID</label>
				<input type='text' id='userId' name='userId' />
				<label for='birthDate'>Birth Date</label>
				<input type='text' id='birthDate' name='birthDate' />
			</div>
			<div>
				<p>Account Information</p>
				<label for='mail'>Email</label>
				<input type='text' id='mail' name='mail' />
				<label for='password'>Password</label>
				<input type='text' id='password' name='password' />
			</div>
			<div>
				<p>Account Security</p>
				<div>
					<p>
						{contractverified === true ? (
							<RxCheckCircled style={{ color: 'green' }} />
						) : contractverified === false ? (
							<BsExclamationLg style={{ color: 'red' }} />
						) : (
							<FaArrowRotateRight style={{ color: 'gray' }} />
						)}
						Contract Verified
					</p>
					<input
						type='file'
						name='file'
						id='file'
						class='inputfile'
						onChange={handleFileChange}
						required
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
									}}
								/>
							) : (
								<GrDocumentVerified
									style={{
										display: 'inline-block',
										marginRight: '0.5rem',
										position: 'relative',
										top: '2px',
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
				</div>
				<div className='user-info-button-con'>
					<button>
						<IoLogOutOutline /> Log out
					</button>
					<button>
						<MdDeleteForever /> Delete Account
					</button>
					<button>
						<FaSave /> Save Changes
					</button>
				</div>
			</div>
		</section>
	);
}
export default UserInfoFake;
