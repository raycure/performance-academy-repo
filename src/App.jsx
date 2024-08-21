import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Main from './pages/Main/Main';
import Contact from './pages/Contact/Contact';
import NoPage from './pages/NoPage/NoPage';
import Classes from './pages/Classes/Classes';
import Register from './pages/Register/Register';
import Events from './pages/Events/Events';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Main />} />
						<Route path='etkinlikler' element={<Events />} />
						<Route path='programlar' element={<Classes />} />
						<Route path='iletişim' element={<Contact />} />
						<Route path='register' element={<Register />} />
						<Route
							path='*'
							element={<NoPage />}
							//required for undefined urls
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
