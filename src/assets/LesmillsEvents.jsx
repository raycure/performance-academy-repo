// LES-MILLS-SPRINT
// LES-MILLS-GRIT

// BORN-TO-MOVE

// BODYPUMP
// BODYCOMBAT
// BODYBALANCE
// LES-MILLS-CORE
// BODYATTACK
// RPM
// SH’BAM
// BODYJAM
// BODYSTEP
// LES-MILLS-TONE
// THE-TRIP
// LES-MILLS-BARRE
// {
// 	title: 'meowww',
// 	start: "2024-11-30",
// 	end: "2024-11-30",
// 	program: 'BODYSTEP',
// 	online: true,
// 	time: iunno,
//	location: [40.7719881790364,-74.07145598632484],
//  instructor: ""
// }
function assignUniqueIds(events) {
	return events.map((event, index) => ({
		...event,
		id: index,
		fullStartDate: new Date(event.date),
		//fullStartDate: new Date(event.start)
		//fullEndDate: new Date(event.end)
	}));
}

export const LesMillsEvents = assignUniqueIds([
	{
		title: 'meow',
		date: '2024-11-20',
		program: 'BORN-TO-MOVE',
		price: '435',
	},
	{
		title: 'LES MILLS GRIT',
		date: '2024-11-26',
		program: 'LES-MILLS-GRIT',
		price: '345',
	},
	{
		title: 'meowww',
		date: '2024-10-29',
		program: 'BODYSTEP',
		price: '345',
	},
	{
		title: 'THE-TRIP',
		date: '2024-08-30',
		program: 'THE-TRIP',
	},
	{
		title: 'BODYJAM',
		date: '2024-09-15',
		program: 'BODYJAM',
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		online: true,
		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		online: true,
		location: [40.7719881790364, -74.07145598632484],
		time: '3.00-17.00',
		program: 'BODYSTEP',
	},
	{
		title: 'meow',
		date: '2024-08-20',
		online: true,
		location: [40.7719881790364, -74.07145598632484],

		time: '3.00-17.00',
		program: 'BORN-TO-MOVE',
	},
	{
		title: 'LES-MILLS-GRIT',
		date: '2024-08-26',
		online: true,
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		program: 'LES-MILLS-GRIT',
	},
	{
		title: 'meowww',
		date: '2024-08-29',
		program: 'BODYSTEP',
	},
	{
		title: 'THE-TRIP',
		date: '2024-08-30',
		program: 'THE-TRIP',
	},
	{
		title: 'BODYJAM',
		date: '2024-09-15',

		program: 'BODYJAM',
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		time: '3.00-17.00',
		program: 'BODYSTEP',
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		location: [40.7719881790364, -74.07145598632484],
		instructor: 'cengiz cumur',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		start: '2024-11-30',
		end: '2024-11-30',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		program: 'BODYSTEP',
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		program: 'BODYSTEP',
		online: true,
	},
]);
