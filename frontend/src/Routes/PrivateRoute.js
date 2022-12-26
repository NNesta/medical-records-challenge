import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
	const user = localStorage.getItem('user');
	const role = !user ? '' : JSON.parse(user).role;
	const Role = role && role.toUpperCase();

	return Role === 'ADMIN' ? <Outlet /> : <Navigate to='/dashboard' />;
}
