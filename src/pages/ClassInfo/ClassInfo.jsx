import React from 'react';
import name from '/ornek.jpg';
import { useLocation, useParams } from 'react-router-dom';

function ClassInfo() {
	const location = useLocation();
	const program = location.state.program;
	console.log(program);

	return (
		<>
			<img aria-label='program pic' className='img' src={name} />
			<p>{program.description}</p>
			<p>{program.whyMember}</p>
			<p>{program.whyYou}</p>
			<p>Sonuçlar: {program.result}</p>
		</>
	);
}
export default ClassInfo;
