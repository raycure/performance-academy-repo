import { useTranslation } from 'react-i18next';

function MilestoneCards() {
	const { t } = useTranslation('translation');
	const listItems = document.querySelectorAll('.milestone-cards li');

	listItems.forEach((item, index) => {
		item.style.bottom = `${index * 0.5}rem`;
	});
	const milestoneData = [
		{ title: t('Milestones.Title.0'), content: t('Milestones.Content.0') },
		{ title: t('Milestones.Title.1'), content: t('Milestones.Content.1') },
		{ title: t('Milestones.Title.2'), content: t('Milestones.Content.2') },
		{ title: t('Milestones.Title.3'), content: t('Milestones.Content.3') },
	];
	return (
		<ul className='milestone-cards'>
			{milestoneData.map((item, index) => (
				<li key={index}>
					<h2 style={{ fontWeight: 'bolder' }} className='fs-650'>
						{item.title}
					</h2>
					<p className='fs-300'>{item.content}</p>
				</li>
			))}
		</ul>
	);
}
export default MilestoneCards;
