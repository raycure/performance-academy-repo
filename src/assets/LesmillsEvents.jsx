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
		const discountedPrice = event.specialPrice
			? basePrice
			: isEarlyBirdDiscount(event.start)
			? Math.ceil(basePrice * 0.878)
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
		title: 'LES-MILLS-CORE',
		start: '2025-02-15',
		end: '2025-02-16',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'LES-MILLS-CORE',
		price: 410,
	},
	{
		title: 'BODYATTACK',
		start: '2025-03-01',
		end: '2025-03-02',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYATTACK',
		price: 410,
	},
	{
		title: 'RPM',
		start: '2025-03-15',
		end: '2025-03-16',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'RPM',
		price: 410,
	},
	{
		title: 'BODYBALANCE',
		start: '2025-04-05',
		end: '2025-04-06',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYBALANCE',
		price: 410,
	},
	{
		title: 'BODYCOMBAT',
		start: '2025-04-19',
		end: '2025-04-20',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYCOMBAT',
		price: 410,
	},
	{
		title: 'LES-MILLS-SPRINT',
		start: '2025-05-03',
		end: '2025-05-04',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'LES-MILLS-SPRINT',
		price: 410,
	},
	{
		title: 'BODYCOMBAT',
		start: '2025-05-09',
		end: '2025-05-09',
		online: false,
		instructor: 'Cengiz Cumhur',
		time: '09.30-17.00',
		program: 'BODYCOMBAT',
		location: (
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.17133419099!2d28.945147076075994!3d40.999622971351705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbd409dd47b3%3A0x50aaad5453409288!2sYenikap%C4%B1%20Etkinlik%20Alan%C4%B1!5e0!3m2!1sen!2str!4v1745770108711!5m2!1sen!2str'
				width='100%'
				height='200'
				style={{ border: 0, marginBlock: 10 }}
				allowfullscreen=''
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			></iframe>
		),
		price: 350,
		specialPrice: true,
	},
	{
		title: 'LES-MILLS-CORE',
		start: '2025-05-10',
		end: '2025-05-10',
		online: false,
		instructor: 'Cengiz Cumhur',
		time: '09.30-17.00',
		program: 'LES-MILLS-CORE',
		location: (
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.17133419099!2d28.945147076075994!3d40.999622971351705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabbd409dd47b3%3A0x50aaad5453409288!2sYenikap%C4%B1%20Etkinlik%20Alan%C4%B1!5e0!3m2!1sen!2str!4v1745770108711!5m2!1sen!2str'
				width='100%'
				height='200'
				style={{ border: 0, marginBlock: 10 }}
				allowfullscreen=''
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			></iframe>
		),
		price: 350,
		specialPrice: true,
	},
	{
		title: 'BODYPUMP',
		start: '2025-05-17',
		end: '2025-05-18',
		online: true,
		instructor: 'Cengiz Cumhur',
		time: '12.00-18.00',
		program: 'BODYPUMP',
		price: 410,
	},
]);
