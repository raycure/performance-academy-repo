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

function assignUniqueIds(events) {
	return events.map((event, index) => ({
		...event,
		id: index,
	}));
}

export const LesMillsEvents = assignUniqueIds([
	{
		title: 'meow',
		date: '2024-08-20',
		color: '#d4006a',
		program: 'BORN-TO-MOVE',
	},
	{
		title: 'meowww',
		date: '2024-08-24',
		color: '#d4006a',
		program: 'BODYSTEP',
	},
	{
		title: 'LES-MILLS-GRIT',
		date: '2024-08-26',
		color: '#d4006a',
		program: 'LES-MILLS-GRIT',
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
		color: '#d4006a',
		program: 'BODYJAM',
	},
	{
		title: 'meowww',
		date: '2024-10-26',
		color: '#d4006a',
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
		program: 'BODYSTEP',
	},
	{
		title: 'meowww',
		date: '2024-12-05',
		color: '#d4006a',
		program: 'BODYSTEP',
	},
]);
