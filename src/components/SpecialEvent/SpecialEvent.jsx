import React from 'react';
import './SpecialEvent.css';
import EventItem from './EventItem';
import event1 from '../../assets/temporalAssets/bodycombat-poster.png';
import event2 from '../../assets/temporalAssets/core-poster.png';
function SpecialEvent() {
	const eventData = [
		{
			poster: event1,
			program: 'BODYCOMBAT',
			text: 'Les Mills BODYCOMBAT, dövüş sanatlarından ilham alan, yüksek enerjili bir kardiyo antrenmanıdır. Eğitmenlik sertifika eğitimi, sizlere sadece mükemmel teknik ve koreografi öğretmekle kalmayacak, aynı zamanda grup enerjisini yönetmeyi ve katılımcıların motivasyonunu nasıl artıracağınızı da gösterecek.',
			eventId: 'BODYCOMBAT_2025-05-09_2025-05-09_false',
		},
		{
			poster: event2,
			program: 'LES-MILLS-CORE',
			text: 'Les Mills CORE programı, merkez bölgeyi hedef alan bilimsel olarak kanıtlanmış egzersizlerle vücudu güçlendirir ve dengeyi artırır. CORE eğitmenlik sertifika eğitimi ile, vücudun merkez bölgesini nasıl etkin bir şekilde çalıştıracağınızı ve bu bilgileri nasıl derslerinize entegre edeceğinizi öğreneceksiniz.',
			eventId: 'LES-MILLS-CORE_2025-05-10_2025-05-10_false',
		},
	];
	return (
		<div className='special-event-outer-con'>
			<p
				className='fs-primary-heading'
				style={{ textAlign: 'center', margin: 16 }}
			>
				Özel Etkinliklerimiz!
			</p>
			{eventData.map((event, index) => {
				return (
					<EventItem
						flexDirection={index % 2 == 0 ? 'row' : 'row-reverse'}
						poster={event.poster}
						program={event.program}
						text={event.text}
						eventId={event.eventId}
					/>
				);
			})}
		</div>
	);
}
export default SpecialEvent;
