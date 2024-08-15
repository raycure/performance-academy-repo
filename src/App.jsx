import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Main from './pages/Main/Main';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';
import NoPage from './pages/NoPage/NoPage';
import Classes from './pages/Classes/Classes';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Main />} />
						<Route path='duyurular' element={<News />} />
						<Route path='programlar' element={<Classes />} />
						<Route path='iletişim' element={<Contact />} />
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
