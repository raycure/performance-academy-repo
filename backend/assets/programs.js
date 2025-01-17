function isEarlyBirdDiscount(eventDate) {
	const currentDate = new Date();
	const eventStart = new Date(eventDate);
	const timeDifference = eventStart - currentDate;
	const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);
	return weeksDifference >= 4;
}

function assignUniqueIds(events) {
	return events.map((event) => {
		const fullStartDate = new Date(event.start);
		const fullEndDate = new Date(event.end);

		const basePrice = event.price;
		const discountedPrice = isEarlyBirdDiscount(event.start)
			? basePrice * 0.85
			: basePrice;

		return {
			...event,
			fullStartDate,
			fullEndDate,
			id: `${event.title}_${event.start}_${event.end}_${event.online}`,
			originalPrice: basePrice,
			price: discountedPrice,
			isEarlyBird: isEarlyBirdDiscount(event.start),
		};
	});
}

export const LesMillsEvents = assignUniqueIds([
	{
		title: 'BODYPUMP',
		start: '2025-02-08',
		end: '2025-02-09',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYPUMP',
		price: 0.5,
	},
	{
		title: 'LES-MILLS-CORE',
		start: '2025-02-15',
		end: '2025-02-16',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'LES-MILLS-CORE',
		price: 400,
	},
	{
		title: 'BODYATTACK',
		start: '2025-03-01',
		end: '2025-03-02',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYATTACK',
		price: 400,
	},
	{
		title: 'RPM',
		start: '2025-03-15',
		end: '2025-03-16',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'RPM',
		price: 400,
	},
	{
		title: 'BODYBALANCE',
		start: '2025-04-05',
		end: '2025-04-06',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYBALANCE',
		price: 400,
	},
	{
		title: 'BODYCOMBAT',
		start: '2025-04-19',
		end: '2025-04-20',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYCOMBAT',
		price: 400,
	},
	{
		title: 'LES-MILLS-SPRINT',
		start: '2025-05-03',
		end: '2025-05-04',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'LES-MILLS-SPRINT',
		price: 400,
	},
]);
