import React from 'react';
import './ProgramOverview.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { FiMoreHorizontal } from 'react-icons/fi';
import { TbTreadmill } from 'react-icons/tb';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { FaPersonHalfDress } from 'react-icons/fa6';
import { HashLink } from 'react-router-hash-link';
import { MdSportsMartialArts } from 'react-icons/md';
function ProgramOverview({ eventID }) {
	const activeEvent = LesMillsEvents[eventID];
	const program = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((program) => {
				return program.id === activeEvent.program;
			});
		})
		.filter(Boolean)[0];
	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
		const navbar = document.querySelector('#navbar');
		const navbarHeight = navbar.offsetHeight;
		const yOffset = -navbarHeight;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};
	return (
		<div className='program-overview-outer-con bg-primary-300' id={eventID}>
			<div className='program-overview-info-con relative-position'>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						width: '100%',
						marginBottom: '1rem',
					}}
				>
					<hr
						style={{
							width: '10%',
							alignSelf: 'center',
							margin: '0rem 1.5rem 0rem 0rem',
						}}
					/>
					<p className='fs-minimal-heading'>{program.title}</p>
					<hr
						style={{
							width: '10%',
							alignSelf: 'center',
							margin: '0rem 0rem 0rem 1.5rem',
						}}
					/>
				</div>

				<div className='program-overview-inner-con'>
					<div>
						<p style={{ fontWeight: 'bolder', display: 'flex', gap: '0.3rem' }}>
							<FaPersonHalfDress style={{ position: 'relative', top: '4px' }} />
							Kime Yönelik
						</p>
						<p style={{ textAlign: 'center' }}>{program.for}</p>
					</div>
					<div>
						<p style={{ fontWeight: 'bolder', display: 'flex', gap: '0.3rem' }}>
							<MdSportsMartialArts
								style={{ position: 'relative', top: '4px' }}
							/>
							Program Türü
						</p>
						<p style={{ textAlign: 'center' }}>{program.type}</p>
					</div>
					<div>
						<p style={{ fontWeight: 'bolder', display: 'flex', gap: '0.3rem' }}>
							<TbTreadmill style={{ position: 'relative', top: '4px' }} />
							Ekipman
						</p>
						<p style={{ textAlign: 'center' }}>{program.equipment}</p>
					</div>
					<div>
						<p style={{ fontWeight: 'bolder', display: 'flex', gap: '0.5rem' }}>
							<FaAngleDoubleUp style={{ position: 'relative', top: '4px' }} />
							Sonuçlar
						</p>
						<p style={{ textAlign: 'center' }}>{program.result}</p>
					</div>
				</div>
				<HashLink
					to={'/programlar#' + program.id}
					style={{
						position: 'absolute',
						right: '1rem',
						bottom: '1rem',
						fontSize: '1.3rem',
					}}
					smooth
					scroll={(el) => scrollWithOffset(el)}
				>
					<FiMoreHorizontal />
				</HashLink>
			</div>
			<video controls style={{ width: '100%' }}>
				<source src='' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
		</div>
	);
}
export default ProgramOverview;
