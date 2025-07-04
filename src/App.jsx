import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

import Loading from './components/Loading/Loading';
import './index.css';
import Main from './pages/Main/Main';
import Process from './pages/Process/Process';
import UserInfo from './pages/UserInfo/UserInfo';
import Layout from './pages/Layout/Layout';
import Events from './pages/Events/Events';
const Contact = lazy(() => import('./pages/Contact/Contact'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const Register = lazy(() => import('./pages/Register-Login/Register'));
const Login = lazy(() => import('./pages/Register-Login/Login'));
const Cookies = lazy(() => import('./pages/Legal/Cookies'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const ClassInfo = lazy(() => import('./pages/ClassInfo/ClassInfo'));
const Classes = lazy(() => import('./pages/Classes/Classes'));
const MyPrograms = lazy(() => import('./pages/MyPrograms/MyPrograms'));
const Suspended = lazy(() =>
	import('./pages/SuspenseNotificationPages/IpBlocked')
);
const Admin = lazy(() => import('./pages/Admin/Admin'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const ForgotPassword = lazy(() =>
	import('./pages/Register-Login/ForgotPassword')
);

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<Suspense fallback={<Loading />}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route index element={<Main />} />
								<Route path='etkinlikler' element={<Events />} />
								<Route path='programlar' element={<Classes />} />
								<Route path='iletişim' element={<Contact />} />
								<Route path='program' element={<ClassInfo />} />
								<Route path='programlarım' element={<MyPrograms />} />
								<Route path='çerezler' element={<Cookies />} />
								<Route path='bilgilerim' element={<UserInfo />} />
								<Route path='engellendi' element={<Suspended />} />
								<Route path='admin' element={<Admin />} />
								<Route path='süreç' element={<Process />} />
								<Route path='dashboard' element={<Dashboard />} />
								<Route path='kaydol' element={<Register />} />
								<Route path='giriş-yap' element={<Login />} />
								<Route
									path='kişisel-verilerin-korunması'
									element={<PrivacyPolicy />}
								/>
							</Route>
							<Route
								path='şifremi-unuttum/:token'
								element={<ForgotPassword />}
							/>
							<Route path='/*' element={<PageNotFound />} />
						</Routes>
					</BrowserRouter>
				</Suspense>
			</PersistGate>
		</Provider>
	);
}

export default App;
