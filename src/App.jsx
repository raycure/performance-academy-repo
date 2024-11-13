import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import React, { Suspense, lazy } from 'react';
import Loading from './components/Loading/Loading';
import './index.css';
import Main from './pages/Main/Main';
const Layout = lazy(() => import('./pages/Layout/Layout')); //todo choose what to lazily load and what not to
const Events = lazy(() => import('./pages/Events/Events'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const Register = lazy(() => import('./pages/Register-Login/Register'));
const Login = lazy(() => import('./pages/Register-Login/Login'));
const Cookies = lazy(() => import('./pages/Legal/Cookies'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const ClassInfo = lazy(() => import('./pages/ClassInfo/ClassInfo'));
const Classes = lazy(() => import('./pages/Classes/Classes'));
const UserInfo = lazy(() => import('./pages/UserInfo/UserInfo'));

function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<Loading />}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Main />} />
							<Route path='etkinlikler' element={<Events />} />
							<Route path='programlar' element={<Classes />} />
							<Route path='iletişim' element={<Contact />} />
							<Route path='register' element={<Register />} />
							<Route path='login' element={<Login />} />
							<Route path='program' element={<ClassInfo />} />
							<Route path='programlarım' element={<MyPrograms />} />
							<Route path='çerezler' element={<Cookies />} />
							<Route path='info' element={<UserInfo />} />
							<Route
								path='kişisel-verilerin-korunması'
								element={<PrivacyPolicy />}
							/>
						</Route>
						<Route path='/*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</Provider>
	);
}

export default App;
