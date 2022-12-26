/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Assets/Styles/login.css';

export default function Signup() {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const user = localStorage.getItem('user') && localStorage.getItem('user');

	useEffect(() => {
		const loggedIn = () => (user ? navigate('/dashboard') : '');

		loggedIn();
	}, []);
	const handleFormSubmit = e => {
		e.preventDefault();

		axios
			.post('http://localhost:5500/api/v1/auth/user/login', {
				...values,
			})
			.then(function (response) {
				toast.success(response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log('datassss===>>>', response.data.data);
				localStorage.setItem('user', JSON.stringify(response.data.data));
				navigate('/dashboard');
			})
			.catch(function (error) {
				toast.error(error.response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log(error.response);
			});
	};

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	return (
		<div className='container'>
			<div className='app-wrapper'>
				<div className='heading'>
					<h1 className='header'>Welcome to Medi-center</h1>
					<span>
						Don't have an account! <Link to='/signup'> Signup</Link>
					</span>
				</div>
				<form>
					<div className='form'>
						<input
							className='input  login-input'
							type='text'
							name='email'
							placeholder='Your email address'
							onChange={handleChange}
						/>
						<input
							className='input login-input'
							type='password'
							name='password'
							placeholder='Create a password'
							onChange={handleChange}
						/>
						<button className='submit' onClick={handleFormSubmit} type='submit'>
							LOGIN
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
