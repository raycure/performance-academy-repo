// import { useRef, useState } from 'react';
// import { AuthService } from '../../auth/auth.service';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import LesmillsPrograms from '../../assets/LesmillsPrograms';
// import { useSelector } from 'react-redux';

// const Dashboard = () => {
// 	const dispatch = useDispatch();
// 	const isLoading = useSelector((state) => state.auth.isLoading);
// 	const userRef = useRef();
// 	const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
// 	const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
// 	const [activeCategory, setActiveCategory] = useState(false);

// 	const lesMillsPrograms = LesmillsPrograms();

// 	const classes = Object.keys(lesMillsPrograms).map((category) => {
// 		if (category !== activeCategory || activeCategory === 'all') return null;
// 		return lesMillsPrograms[category].map((classTitle, index) => {
// 			return (
// 				<div
// 					className='dropDownCategoryItem'
// 					key={index}
// 					style={
// 						activeClass === classTitle.id ? { backgroundColor: 'gray' } : {}
// 					}
// 					onClick={() => setActiveClass(classTitle.id)}
// 				>
// 					{classTitle.title}
// 				</div>
// 			);
// 		});
// 	});

// 	useEffect(() => {
// 		userRef.current.focus();
// 	}, []);
// };

// export default Dashboard;
