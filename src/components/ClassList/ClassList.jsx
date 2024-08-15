import React from 'react';
import './Classes.css';
import Button from '../Button/Button';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '../../assets/ornek.jpg';
function ClassList({ classType }) {
	function classClickHandler() {}
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			return;
		}
		return (
			<>
				{lesMillsPrograms[category].map((program, subIndex) => (
					<div
						className='class-item-container'
						onClick={classClickHandler}
					>
						<img
							aria-label='program pic'
							className='img class-img'
							src={name}
						/>
						<div className='info-container'>
							<img
								aria-label='logo'
								className='img logo'
								src={name}
							/>
							<h2 className='slogan'>{program}</h2>
							<div>
								<p>
									Egzersiz tipi
									<br />
								</p>
								<Button>
									Daha Fazlası
									<MdOutlineDoubleArrow color='red' />
								</Button>
							</div>
						</div>
					</div>
				))}
			</>
		);
	});
	return <>{classes}</>;
}
export default ClassList;
