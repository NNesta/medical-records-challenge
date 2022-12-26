import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import NoRedirect from './Pages/NoRedirect';
import PrivateRoute from './Routes/PrivateRoute';
import RedirectLogin from './Pages/ToLogin';
import Signup from './Pages/Signup';
import Users from './Pages/Users';
import 'react-toastify/dist/ReactToastify.css';
import './Assets/Styles/App.css';

function App() {
	return (
		<div>
			<ToastContainer position='top-left' />
			<Routes>
				<Route path='/' element={<RedirectLogin />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/*' element={<NoRedirect />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
				<Route element={<PrivateRoute />}>
					<Route path='/users' element={<Users />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
