import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Main from './pages/Main/Main';
import Events from './pages/Events/Events';
import Contact from './pages/Contact/Contact';
import NoPage from './pages/NoPage/NoPage';
import Classes from './pages/Classes/Classes';
import Register from './pages/Register-Login/Register';
import Login from './pages/Register-Login/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import Cookies from './pages/Legal/Cookies';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import Test from './pages/Test';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Main />} />
							<Route path='etkinlikler' element={<Events />} />
							<Route path='programlar' element={<Classes />} />
							<Route path='iletişim' element={<Contact />} />
							<Route path='register' element={<Register />} />
							<Route path='login' element={<Login />} />
							<Route path='çerezler' element={<Cookies />} />
							<Route path='test' element={<Test />} />

							<Route
								path='kişisel-verilerin-korunması'
								element={<PrivacyPolicy />}
							/>
							<Route
								path='*'
								element={<NoPage />}
								//required for undefined urls
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
