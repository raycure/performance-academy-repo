import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import ColumnContainer from '../../components/columnContainer/columnContainer';
function Layout() {
	return (
		<>
			<Navbar />
<ColumnContainer>gasjf</ColumnContainer>
			<Outlet />
			<Footer />
		</>
		
	);
}
export default Layout;
