import React from 'react';
import './ClassList.css';
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
						className='class-item-container top-border-light row'
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
							<h2 className='slogan'>{program.title}</h2>
							<div className='row more-button-container top-border-light'>
								<p>
									Egzersiz tipi
									<br />
									{program.type}
								</p>
								<Button>
									Daha Fazlası
									<MdOutlineDoubleArrow color='white' />
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
