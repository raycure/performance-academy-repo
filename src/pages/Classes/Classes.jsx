import React, { useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
function Classes() {
	const [classType, setClassType] = useState('all');
	function classSelectHandler() {}
	return (
		<>
			<img aria-label='class picture'></img>
			<ClassList classType={classType} />
		</>
	);
}
export default Classes;
