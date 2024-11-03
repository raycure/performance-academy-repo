// LES-MILLS-SPRINT
// LES-MILLS-GRIT

// BORN-TO-MOVE

// BODYPUMP
// BODYCOMBAT
// LES-MILLS-BODYBALANCE
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
// 	color: '#d4006a',
// 	program: 'BODYSTEP',
// 	online: true,
// 	time: iunno,
//	location: [40.7719881790364,-74.07145598632484],
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
		color: '#d4006a',
		program: 'BORN-TO-MOVE',
		price: '435',
	},
	{
		title: 'LES MILLS GRIT',
		date: '2024-11-26',
		color: '#d4006a',
		program: 'LES-MILLS-GRIT',
		price: '345',
	},
	{
		title: 'meowww',
		date: '2024-10-29',
		color: '#d4006a',
		program: 'BODYSTEP',
		price: '345',
	},
	{
		title: 'THE-TRIP',
		date: '2024-08-30',
		color: '#d4006a',
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
		color: '#d4006a',
		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		color: '#d4006a',
		online: true,
		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		color: '#d4006a',
		online: true,
		location: [40.7719881790364, -74.07145598632484],
		program: 'BODYSTEP',
	},
	{
		title: 'meow',
		date: '2024-08-20',
		color: '#d4006a',
		online: true,
		location: [40.7719881790364, -74.07145598632484],
		program: 'BORN-TO-MOVE',
	},
	{
		title: 'LES-MILLS-GRIT',
		date: '2024-08-26',
		color: '#d4006a',
		online: true,
		location: [40.7719881790364, -74.07145598632484],
		program: 'LES-MILLS-GRIT',
	},
	{
		title: 'meowww',
		date: '2024-08-29',
		color: '#d4006a',
		program: 'BODYSTEP',
	},
	{
		title: 'THE-TRIP',
		date: '2024-08-30',
		color: '#d4006a',
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
		color: '#d4006a',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		color: '#d4006a',
		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		color: '#d4006a',
		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		program: 'BODYSTEP',
		location: [40.7719881790364, -74.07145598632484],
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		color: '#d4006a',
		location: [40.7719881790364, -74.07145598632484],
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		color: '#d4006a',
		location: [40.7719881790364, -74.07145598632484],
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		color: '#d4006a',
		location: [40.7719881790364, -74.07145598632484],
		program: 'BODYSTEP',
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-10-26',

		location: [40.7719881790364, -74.07145598632484],
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-30',
		start: '2024-11-30',
		end: '2024-11-30',
		color: '#d4006a',
		program: 'BODYSTEP',
		online: true,
	},
	{
		title: 'meowww',
		date: '2024-11-31',
		color: '#d4006a',
		program: 'BODYSTEP',
		online: false,
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		color: '#d4006a',
		program: 'BODYSTEP',
		online: true,
	},
]);
