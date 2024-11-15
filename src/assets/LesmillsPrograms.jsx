import { useTranslation } from 'react-i18next';
function LesmillsPrograms() {
	const { t, i18n } = useTranslation('programs');
	const lesMillsPrograms = {
		[t('cat1.title')]: [
			{
				title: 'BODYPUMP',
				logo: '/classLogo/BODYPUMP.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/365BF308-3E09-40C9-9E35204A3A883A48/webimage-50c1fbd9-ccb1-4d99-82a8-7eabb7af94fa.png',
						alt: 'BODYPUMP image 1',
						description: 'BODYPUMP exercise demonstration',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/F388D152-22E8-4573-87DCAB935AE92BC5/webimage-11450044-cf5d-4115-a159-e00eedf6bb71.png',
						alt: 'BODYPUMP image 2',
						description: 'BODYPUMP group class in action',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/28450439-B469-451F-8F633E972D823586/webimage-FBCCFCFD-E733-490C-8651079FBD8C2A60.png',
						alt: 'BODYPUMP image 3',
						description: 'BODYPUMP workout equipment setup',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/39125890-D3FB-4F4F-9A4FE03B8EE859AB/webimage-ed2e354c-b3e1-4d75-b4da-ee8ab34a58de.png',
						alt: 'BODYPUMP image 4',
						description: 'BODYPUMP instructor-led workout session',
					},
				],
				id: 'BODYPUMP',
				sum: t('cat1.program1.sum'),
				description: t('cat1.program1.description'),
				whyMember: t('cat1.program1.whyMember'),
				whyYou: t('cat1.program1.whyYou'),
				type: t('cat1.program1.type'),
				lessons: t('cat1.program1.lessons'),
				equipment: t('cat1.program1.equipment'),
				for: t('cat1.program1.for'),
				result: t('cat1.program1.result'),
			},
			{
				title: 'BODYCOMBAT',
				logo: '/classLogo/BODYCOMBAT.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/4F93822E-1A1E-48B7-A8DBA85BC29DE840/webimage-7c2034ae-a4c5-4415-bb32-90dfdadda5b8.png',
						alt: 'BODYCOMBAT image 5',
						description: 'BODYCOMBAT workout session with participants',
					},
					{
						url: 'https://d2csxpduxe849s.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/8DA1911D-694D-42D6-9D8CF3AE8E594466/webimage-70BA8566-AF1C-448E-A21A8CBB04B2FF0E.png',
						alt: 'BODYCOMBAT image 6',
						description: 'BODYCOMBAT instructor demonstrating techniques',
					},
					{
						url: 'https://d2csxpduxe849s.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/E13A93F6-212C-4DD3-AC07493131227460/webimage-AD6CFFBE-E110-42ED-8FCE8E030358432B.png',
						alt: 'BODYCOMBAT image 7',
						description: 'BODYCOMBAT fitness equipment close-up',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/1B870376-F142-410D-A95599A945362400/webimage-72CA6A8F-9E79-43C9-AFB3E3F5D7FDF12C.png',
						alt: 'BODYCOMBAT image 8',
						description: 'BODYCOMBAT dynamic workout action shot',
					},
				],
				id: 'BODYCOMBAT',
				sum: t('cat1.program2.sum'),
				description: t('cat1.program2.description'),
				whyMember: t('cat1.program2.whyMember'),
				whyYou: t('cat1.program2.whyYou'),
				type: t('cat1.program2.type'),
				lessons: t('cat1.program2.lessons'),
				equipment: t('cat1.program2.equipment'),
				for: t('cat1.program2.for'),
				result: t('cat1.program2.result'),
			},

			{
				title: 'BODYBALANCE',
				logo: '/classLogo/BODYBALANCE.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6F20D63C-595A-49B0-983845AA5C7CAFAB/A993D0BF-8723-497B-82F5176F61FBB321/webimage-A5668372-6756-431F-90443E24C34AFA0C.png',
						alt: 'BODYBALANCE image 1',
						description: 'BODYBALANCE yoga pose demonstration',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/716BB191-88F3-4EA4-B9EB4F02A51B9231/D990C758-DCFE-466B-B48CAF4DC780395E/webimage-93EA6C91-D436-4364-A4288702AD373055.png',
						alt: 'BODYBALANCE image 2',
						description: 'BODYBALANCE group session in a serene environment',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/43939E87-F7B6-4C1B-B34080533075C965/D092A67E-0F8E-4C4C-A401544324FCFD3C/webimage-5CC77473-AD04-44DB-BE055F1398A64404.png',
						alt: 'BODYBALANCE image 3',
						description: 'BODYBALANCE calming stretch exercise',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/73A9D76A-4884-4E60-8A2C28BAC7957A65/webimage-ec23944b-71b8-4eb5-98a1-9fe065446287.png',
						alt: 'BODYBALANCE image 4',
						description: 'BODYBALANCE participants enjoying a relaxed session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/0331E9F7-A37B-4E65-80770ECDBD760AE7/webimage-6fcd2469-4763-41ea-8817-630152eb5ba5.png',
						alt: 'BODYBALANCE image 5',
						description: 'BODYBALANCE core strength routine',
					},
				],
				id: 'BODYBALANCE',
				sum: t('cat1.program3.sum'),
				description: t('cat1.program3.description'),
				whyMember: t('cat1.program3.whyMember'),
				whyYou: t('cat1.program3.whyYou'),
				type: t('cat1.program3.type'),
				lessons: t('cat1.program3.lessons'),
				equipment: t('cat1.program3.equipment'),
				for: t('cat1.program3.for'),
				result: t('cat1.program3.result'),
			},
			{
				title: 'LES MILLS CORE',
				logo: '/classLogo/CORE.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/043D6B6C-F9C2-447C-8D4B43480F1F9600/webimage-DCE070F8-59AB-4AED-B3EED9A43915BD3C.png',
						alt: 'CORE image 1',
						description:
							'CORE fitness routine focusing on core strength and stability',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/82205544-1F9E-4AB9-9FDCED1C76A2FAF1/webimage-32280F12-9884-43C2-BD2C498587F02CEE.png',
						alt: 'CORE image 2',
						description:
							'CORE participants engaging in an intense group workout session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/5D984F68-B808-4DFE-9549C5B2C17D5EEF/webimage-71847EEA-ABE6-4F5B-8F3F25081F68DBF1.png',
						alt: 'CORE image 3',
						description:
							'CORE exercise emphasizing functional core training techniques',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6DBF26B1-EAD1-41E8-87F578CFA9C6CC13/webimage-DB1F8A58-633C-4C11-98798C96D669CA94.jpg',
						alt: 'CORE image 4',
						description:
							'CORE session in progress with participants strengthening their core muscles',
					},
				],
				id: 'LES-MILLS-CORE',
				sum: t('cat1.program4.sum'),
				description: t('cat1.program4.description'),
				whyMember: t('cat1.program4.whyMember'),
				whyYou: t('cat1.program4.whyYou'),
				type: t('cat1.program4.type'),
				lessons: t('cat1.program4.lessons'),
				equipment: t('cat1.program4.equipment'),
				for: t('cat1.program4.for'),
				result: t('cat1.program4.result'),
			},
			{
				title: 'BODYATTACK',
				logo: '/classLogo/BODYATTACK.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6A3EE364-68C7-42E5-BEB2B6B299B86A66/webimage-6ED73243-9086-4933-926A11BD4D735C34.png',
						alt: 'BODYATTACK image 1',
						description:
							'BODYATTACK high-energy cardio workout session for maximum endurance',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/FE21E0B8-8FC7-4056-BB3D2247C307F61E/webimage-371945DE-9CB7-4154-8E109681DF1F2E07.png',
						alt: 'BODYATTACK image 2',
						description:
							'BODYATTACK participants pushing their limits with athletic movements',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/3F5285DA-D683-45A5-9F2D8611C9273070/webimage-4B53D3CA-E5FB-4919-AF3832592567192A.png',
						alt: 'BODYATTACK image 3',
						description:
							'BODYATTACK full-body workout for strength and agility',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/2CEE1885-972F-48AB-8572375C16B34B37/webimage-C8D59114-52CB-4B90-8363DF32A693B62A.png',
						alt: 'BODYATTACK image 4',
						description:
							'BODYATTACK group session focused on building power and speed',
					},
				],
				id: 'BODYATTACK',
				sum: t('cat1.program5.sum'),
				description: t('cat1.program5.description'),
				whyMember: t('cat1.program5.whyMember'),
				whyYou: t('cat1.program5.whyYou'),
				type: t('cat1.program5.type'),
				lessons: t('cat1.program5.lessons'),
				equipment: t('cat1.program5.equipment'),
				for: t('cat1.program5.for'),
				result: t('cat1.program5.result'),
			},
			{
				title: 'RPM',
				logo: '/classLogo/RPM.png',
				id: 'RPM',
				sum: t('cat1.program6.sum'),
				description: t('cat1.program6.description'),
				whyMember: t('cat1.program6.whyMember'),
				whyYou: t('cat1.program6.whyYou'),
				type: t('cat1.program6.type'),
				lessons: t('cat1.program6.lessons'),
				equipment: t('cat1.program6.equipment'),
				for: t('cat1.program6.for'),
				result: t('cat1.program6.result'),
			},
			{
				title: 'SH’BAM',
				logo: '/classLogo/SH’BAM.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/BC73DCE1-576C-47CB-BE4E8090BCE23034/webimage-33314017-B9B1-48F1-8828FD94556ED1B9.png',
						alt: 'RPM image 1',
						description:
							'RPM indoor cycling session with participants pushing their limits',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/0D61D81E-7DF4-4837-A71ACA90484672AC/webimage-9D9F8926-4444-4E78-9D7474C6AE1ECADE.png',
						alt: 'RPM image 2',
						description:
							'RPM high-intensity cycling workout designed to boost cardio endurance',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/DCFEB96B-2D40-4EDE-8D9EAD874D9AF39E/webimage-8FEFDCA1-3978-488B-8B366E890DF9BBB8.png',
						alt: 'RPM image 3',
						description:
							'RPM riders experiencing an energizing group cycling class',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/C79FB64C-9AD5-4806-8CAF36C24660A5A3/webimage-E9BB2164-282C-44E5-B8E1D5A1548AE1EB.png',
						alt: 'RPM image 4',
						description:
							'RPM class focused on interval training for increased stamina',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/E45F25D1-332C-4AEF-BC0A5FAB6A1110A2/webimage-8F2B17A5-C1A2-447C-8C245B800C4EDB55.png',
						alt: 'RPM image 5',
						description:
							'RPM participants enjoying a motivating cycling experience',
					},
				],
				id: 'SH’BAM',
				sum: t('cat1.program7.sum'),
				description: t('cat1.program7.description'),
				whyMember: t('cat1.program7.whyMember'),
				whyYou: t('cat1.program7.whyYou'),
				type: t('cat1.program7.type'),
				lessons: t('cat1.program7.lessons'),
				equipment: t('cat1.program7.equipment'),
				for: t('cat1.program7.for'),
				result: t('cat1.program7.result'),
			},
			{
				title: 'BODYJAM',
				logo: '/classLogo/BODYJAM.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A2E13E1F-3B64-42D5-8217C60424DE97E5/webimage-F142161C-3ED2-476B-9F37C38760E93C36.png',
						alt: 'BODYJAM image 1',
						description:
							'BODYJAM participants performing a high-energy dance workout',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/D1FF26D9-9FDC-4011-81F250D79E171607/webimage-2E951402-D3AD-4E8A-B224D11563D1B64B.png',
						alt: 'BODYJAM image 2',
						description:
							'BODYJAM dancers in a lively, synchronized group performance',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A2E13E1F-3B64-42D5-8217C60424DE97E5/webimage-F142161C-3ED2-476B-9F37C38760E93C36.png',
						alt: 'BODYJAM image 3',
						description:
							'BODYJAM vibrant group session with energetic choreography',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/F216C533-0A06-4E9B-A4B7BCCD6F54C493/webimage-E2446248-A396-4D49-AEFC57BDCFE222FB.png',
						alt: 'BODYJAM image 4',
						description:
							'BODYJAM workout session featuring smooth dance moves and beats',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/983E1137-3F51-481B-88432675608B1BDE/webimage-44D12886-97AD-4F68-87FDE1C0933B3161.png',
						alt: 'BODYJAM image 5',
						description:
							'BODYJAM participants dancing in an energetic, rhythmic routine',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A3240DB4-8618-485B-8D892DCF87CA73A7/webimage-102E0D2A-079D-420D-851A136452D02B79.jpg',
						alt: 'BODYJAM image 6',
						description:
							'BODYJAM group enjoying a fun and rhythmic dance workout',
					},
				],
				id: 'BODYJAM',
				sum: t('cat1.program8.sum'),
				description: t('cat1.program8.description'),
				whyMember: t('cat1.program8.whyMember'),
				whyYou: t('cat1.program8.whyYou'),
				type: t('cat1.program8.type'),
				lessons: t('cat1.program8.lessons'),
				equipment: t('cat1.program8.equipment'),
				for: t('cat1.program8.for'),
				result: t('cat1.program8.result'),
			},
			{
				title: 'BODYSTEP',
				logo: '/classLogo/BODYSTEP.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/03BFDEE2-12E4-4D3A-B6B5E56D6B60F1E1/webimage-FCFED11C-86D6-4F07-902C62B32659C8C2.png',
						alt: 'BODYSTEP image 1',
						description:
							'BODYSTEP participants performing an energetic step workout',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/F6E81DBD-3391-4780-ADB6C6F6CDA6BA9C/webimage-0888BF56-E47C-4BA5-BDAEE11A03974D24.png',
						alt: 'BODYSTEP image 2',
						description:
							'BODYSTEP high-intensity aerobic workout with step exercises',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/16969BB9-3168-4F8E-B8BF2D05E640EAB6/webimage-296C8233-A009-40D4-BC36B13251C12AF1.png',
						alt: 'BODYSTEP image 3',
						description:
							'BODYSTEP session with participants stepping in unison to the beat',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/FFB69FE4-D6DA-484B-9F76937998A3A035/webimage-C210BE7D-BFAC-4C0A-B7BEADF7DFD9A7AB.png',
						alt: 'BODYSTEP image 4',
						description:
							'BODYSTEP workout with a focus on strengthening legs and glutes',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A020E270-E34C-4BC0-B9746B903FD0ADA5/webimage-3C888C35-EE2F-49BC-A3C24855A2790CCB.jpg',
						alt: 'BODYSTEP image 5',
						description:
							'BODYSTEP participants enjoying a dynamic and fun group class',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/C597B8B2-7F11-4324-A596C1F4BFD4FE4D/webimage-4076C439-FD17-4A38-BD1B4ED26C38A8DD.jpg',
						alt: 'BODYSTEP image 6',
						description:
							'BODYSTEP group class in motion, focusing on cardio and endurance',
					},
				],
				id: 'BODYSTEP',
				sum: t('cat1.program9.sum'),
				description: t('cat1.program9.description'),
				whyMember: t('cat1.program9.whyMember'),
				whyYou: t('cat1.program9.whyYou'),
				type: t('cat1.program9.type'),
				lessons: t('cat1.program9.lessons'),
				equipment: t('cat1.program9.equipment'),
				for: t('cat1.program9.for'),
				result: t('cat1.program9.result'),
			},
			{
				title: 'LES MILLS TONE',
				logo: '/classLogo/TONE.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/7A65DBA1-DFC7-4756-BEB38345DBE274E6/webimage-FAC5C027-4A59-4D44-A1A39E21FD41E6FB.png',
						alt: 'LES MILLS TONE image 1',
						description:
							'LES MILLS TONE participants engaging in a balanced fitness routine',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/BB2C9E4A-035B-4CA0-B743AFDE971ACD83/webimage-5814B34A-CFE6-4922-BBB7668A631D1B75.png',
						alt: 'LES MILLS TONE image 2',
						description:
							'LES MILLS TONE class focusing on strength and endurance training',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/69FB7C8E-56F7-4FFF-88343275FCA30B51/webimage-99E0A0E0-70C3-412C-87428DA812C6125B.png',
						alt: 'LES MILLS TONE image 3',
						description:
							'LES MILLS TONE workout group performing diverse body conditioning exercises',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/E21F117B-B7AA-4EB0-8247D1A3555EDE88/webimage-7964D227-BC5E-40F4-801ACDD96D58181D.png',
						alt: 'LES MILLS TONE image 4',
						description:
							'LES MILLS TONE participants focused on functional fitness movements',
					},
				],
				id: 'LES-MILLS-TONE',
				sum: t('cat1.program10.sum'),
				description: t('cat1.program10.description'),
				whyMember: t('cat1.program10.whyMember'),
				whyYou: t('cat1.program10.whyYou'),
				type: t('cat1.program10.type'),
				lessons: t('cat1.program10.lessons'),
				equipment: t('cat1.program10.equipment'),
				for: t('cat1.program10.for'),
				result: t('cat1.program10.result'),
			},
			{
				title: 'THE TRIP',
				logo: '/classLogo/THE-TRIP.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/01516D71-7D7E-4AD8-93E3C8456A2876B0/webimage-CAD0162B-3614-475E-A6FAED808858FCA8.png',
						alt: 'THE TRIP image 1',
						description:
							'THE TRIP immersive cycling experience with virtual environments',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/666908BE-C974-416E-A15BFE359CA5088F/webimage-5e41cfba-73f3-4ffa-a829-206b22fb3bbd.png',
						alt: 'THE TRIP image 2',
						description:
							'THE TRIP class cycling through virtual scenic landscapes',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/BB17F7B9-0A47-476E-8C453B64F73C197B/webimage-07bb6536-32eb-4a13-b0e2-ef3713aaa5ba.png',
						alt: 'THE TRIP image 3',
						description:
							'Cyclists participating in THE TRIP class with a futuristic setting',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/2E369200-2CCA-4BF0-A450009E8897E52B/webimage-d73c07a8-9794-4bcd-8be7-50b2fbde42d3.png',
						alt: 'THE TRIP image 4',
						description:
							'Cyclists enjoying a virtual reality workout with THE TRIP',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/7D87926C-5838-42AC-A2D05D10F137005C/webimage-858bc895-9c84-4f94-9243-2c8794df95b2.png',
						alt: 'THE TRIP image 5',
						description:
							'Participants engaged in THE TRIP, a combination of cycling and immersive visuals',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/5C54FC9B-CBDE-40D0-B7C77EC65F57BD5E/webimage-3a1ff076-24f2-4dca-86e4-038feff25caf.png',
						alt: 'THE TRIP image 6',
						description:
							'A close-up shot of the immersive technology used in THE TRIP class',
					},
				],
				id: 'THE-TRIP',
				sum: t('cat1.program11.sum'),
				description: t('cat1.program11.description'),
				whyMember: t('cat1.program11.whyMember'),
				whyYou: t('cat1.program11.whyYou'),
				type: t('cat1.program11.type'),
				lessons: t('cat1.program11.lessons'),
				equipment: t('cat1.program11.equipment'),
				for: t('cat1.program11.for'),
				result: t('cat1.program11.result'),
			},
			{
				title: 'LES MILLS BARRE',
				logo: '/classLogo/BARRE.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/21A6A94E-CDA6-4991-B5A1BA4D21B1D4B5/webimage-FCA8FDA7-AC28-4BF8-BC6A5CFB12F5C85E.png',
						alt: 'LES MILLS BARRE image 1',
						description:
							'A group of participants in LES MILLS BARRE class performing ballet-inspired exercises',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/E59E4347-D5E2-4C1D-B93E9A642BF73859/webimage-89870EC4-256B-4230-9DC240608319AB43.png',
						alt: 'LES MILLS BARRE image 2',
						description:
							'Close-up of a participant engaging in a LES MILLS BARRE stretch and strength routine',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/8E0ADDCB-B454-468B-868C466B9104A3D2/webimage-F431A126-B9DF-4750-8539768ABF37D903.png',
						alt: 'LES MILLS BARRE image 3',
						description:
							'A group workout session in LES MILLS BARRE class with a focus on body conditioning',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/01472ED7-54EB-46A2-AFB82978B63616BC/webimage-6D197192-0690-4E63-8989B83B7926AD2C.png',
						alt: 'LES MILLS BARRE image 4',
						description:
							'Participants performing ballet-inspired movements with focus on posture and flexibility in LES MILLS BARRE',
					},
				],
				id: 'LES-MILLS-BARRE',
				sum: t('cat1.program12.sum'),
				description: t('cat1.program12.description'),
				whyMember: t('cat1.program12.whyMember'),
				whyYou: t('cat1.program12.whyYou'),
				type: t('cat1.program12.type'),
				lessons: t('cat1.program12.lessons'),
				equipment: t('cat1.program12.equipment'),
				for: t('cat1.program12.for'),
				result: t('cat1.program12.result'),
			},
		],
		[t('cat2.title')]: [
			{
				title: 'BORN TO MOVE',
				logo: '/classLogo/BORNTOMOVE.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A33E350A-F10B-469C-BF29329EF49D9897/webimage-2EC03E69-AF61-43CA-8D9E9EA10FD8186C.png',
						alt: 'Born to Move image 1',
						description:
							'Children enjoying a fun and dynamic Born to Move class session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/FDD22E07-D5E6-482B-B5A8B2FB4AA7801D/webimage-7BE2C11B-DD84-4197-829FAB4D5E5335FD.png',
						alt: 'Born to Move image 2',
						description:
							'Group of young participants actively engaging in a Born to Move fitness activity',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/A8E6707E-4DC9-4583-95BFE7900421EC1F/webimage-6C4F7A12-DEE6-4176-A6A1B96953A4C029.png',
						alt: 'Born to Move image 3',
						description:
							'Close-up of children performing movement-based exercises in a Born to Move class',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/F07BE64A-D048-4E48-BB73144C217E4674/webimage-93DE7D79-4B74-4E04-88F55F38BDB63993.png',
						alt: 'Born to Move image 4',
						description:
							'Children participating in a high-energy group workout designed for kids in Born to Move',
					},
				],
				id: 'BORN-TO-MOVE',
				subTitles: [
					`BORN TO MOVE 2-3 ${t('cat2.program1.subTitle')}`,
					`BORN TO MOVE 4-5 ${t('cat2.program1.subTitle')}`,
					`BORN TO MOVE 6-7 ${t('cat2.program1.subTitle')}`,
					`BORN TO MOVE 8-12 ${t('cat2.program1.subTitle')}`,
					`BORN TO MOVE 13-16 ${t('cat2.program1.subTitle')}`,
				],
				sum: t('cat2.program1.sum'),
				description: t('cat2.program1.description'),
				why: t('cat2.program1.why'),
				type: t('cat2.program1.type'),
				lessons: t('cat2.program1.lessons'),
				equipment: t('cat2.program1.equipment'),
				for: t('cat2.program1.for'),
				result: t('cat2.program1.result'),
			},
		],
		[t('cat3.title')]: [
			{
				title: 'LES MILLS SPRINT',
				logo: '/classLogo/SPRINT.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/192D1A9B-D4B0-4836-9301E13305EB8403/webimage-65F067DD-4B3C-4D2B-B4041F76164C993E.png',
						alt: 'Les Mills Sprint image 1',
						description:
							'Cyclist pushing through high-intensity interval training during a Les Mills Sprint session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/082E98D1-46B4-4111-96705B492B065969/webimage-5CD12AA5-385C-4D46-B9D1088743E46DB2.png',
						alt: 'Les Mills Sprint image 2',
						description:
							'Group of individuals performing high-intensity sprints on stationary bikes in a Les Mills Sprint class',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/9A9A3C87-2C7B-48F1-BC3C6BFE1AA4A8EF/webimage-E3B1B04B-F745-4400-A5DCDA2AA1C1B144.png',
						alt: 'Les Mills Sprint image 3',
						description:
							'A close-up of a person focusing on their sprint performance in a Les Mills Sprint class',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/5174F9B5-2D36-4151-921C74CAA5190AEE/webimage-8B0F449F-A531-406E-B7EB3F3704DB09D5.png',
						alt: 'Les Mills Sprint image 4',
						description:
							'Cyclists engaging in an intense, fast-paced workout during a Les Mills Sprint session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/5B988E9A-BC51-425D-8B69482B519AAB4E/webimage-8C36128B-428E-46A6-8B9233834F503DCA.png',
						alt: 'Les Mills Sprint image 5',
						description:
							'Participants giving their all in a Les Mills Sprint class, focusing on intervals of sprinting',
					},
				],
				id: 'LES-MILLS-SPRINT',
				sum: t('cat3.program1.sum'),
				description: t('cat3.program1.description'),
				whyMember: t('cat3.program1.whyMember'),
				whyYou: t('cat3.program1.whyYou'),
				type: t('cat3.program1.type'),
				lessons: t('cat3.program1.lessons'),
				equipment: t('cat3.program1.equipment'),
				for: t('cat3.program1.for'),
				result: t('cat3.program1.result'),
			},
			{
				title: 'LES MILLS GRIT',
				logo: '/classLogo/GRIT.png',
				additionalPictures: [
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/74417EEE-A720-4805-AE47B4C9EDF12F2F/webimage-4F7A6C4A-1CDD-429E-B17EFDF33AEAB9B0.png',
						alt: 'Les Mills GRIT image 1',
						description:
							'Participants pushing through an intense HIIT workout during a Les Mills GRIT session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/6FC7850D-C362-4018-9F783DC43B62A71F/webimage-BFD6F30A-1013-4334-8E8CB32BF46BD6D2.png',
						alt: 'Les Mills GRIT image 2',
						description:
							'A close-up of someone performing a squat jump as part of their GRIT workout',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/FE61FA47-A133-45CB-B30307D3F8F9DFA3/webimage-D9C6366B-E72E-4F0D-A1686D28841989D7.png',
						alt: 'Les Mills GRIT image 3',
						description:
							'A group of individuals giving their best effort during a Les Mills GRIT session',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/F14FEAD8-13F0-4800-BBE457C5BA443080/webimage-0035C312-B79F-4BE7-957698C51376A078.png',
						alt: 'Les Mills GRIT image 4',
						description:
							'A fitness instructor motivating participants during a high-intensity GRIT workout',
					},
					{
						url: 'https://d2lsjsqnstxud9.cloudfront.net/media/13959BF0-BCE0-4B85-83FC898FABC86C4C/064CAEB6-9C22-4055-808FF5CB60081422/webimage-10950CD8-FDF4-44C4-81E86E3D47D17272.png',
						alt: 'Les Mills GRIT image 5',
						description:
							'A dynamic moment during a GRIT class as participants focus on their HIIT workout',
					},
				],
				id: 'LES-MILLS-GRIT',
				subTitles: ['GRIT Strenght', 'GRIT Cardio', 'GRIT Athletic'],
				sum: t('cat3.program2.sum'),
				description: t('cat3.program2.description'),
				whyMember: t('cat3.program2.whyMember'),
				whyYou: t('cat3.program2.whyYou'),
				type: t('cat3.program2.type'),
				lessons: t('cat3.program2.lessons'),
				equipment: t('cat3.program2.equipment'),
				for: t('cat3.program2.for'),
				result: t('cat3.program2.result'),
			},
		],
	};
	return lesMillsPrograms;
}
export default LesmillsPrograms;
