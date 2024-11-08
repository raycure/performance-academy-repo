import React from 'react';
import ProgramOverview from '../../components/ProgramOverview/ProgramOverview';
function MyPrograms() {
	const userEventIDs = ['1', '3'];
	return (
		<section>
			{userEventIDs.map((id) => {
				return (
					<div key={id}>
						<ProgramOverview eventID={id} />
					</div>
				);
			})}
		</section>
	);
}
export default MyPrograms;
