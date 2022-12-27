import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsShieldLockFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Select from 'react-select';
import axios from 'axios';
import countryList from 'react-select-country-list';
import '../Assets/Styles/signup.css';

export default function SignupForm() {
	const [selected, setSelected] = useState('');

	const selectDropdown = e => {
		const val = e.target.value;
		setSelected(val);
	};
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		age: '',
		gender: '',
		country: '',
		role: '',
	});

	const navigate = useNavigate();

	const handleFormSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5500/api/v1/auth/users/signup', {
				...values,
				role: selected,
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
				navigate('/login');
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
			});
	};

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [value, setValue] = useState('');
	const options = useMemo(() => countryList().getData(), []);

	const changeHandler = (value, key) => {
		setValue(value);
		setValues({ ...values, [key.name]: value.label });
	};

	return (
		<div className='container'>
			<div className='wrapper'>
				<div className='heading'>
					<h2 className='title'>Welcome to medical retrieve app</h2>
					<span className='span'>
						Already have an account!{' '}
						<Link
							className='link'
							to={'/login'}
							style={{ textDecoration: 'none' }}
						>
							Login
						</Link>
					</span>
				</div>
				<form onSubmit={handleFormSubmit}>
					<div className='names'>
						<input
							className='input'
							type='text'
							name='firstName'
							value={values.firstName}
							placeholder='Firstname...'
							onChange={handleChange}
						></input>

						<input
							className='input'
							type='text'
							name='lastName'
							value={values.lastName}
							placeholder='Lastname...'
							onChange={handleChange}
						></input>
					</div>
					<div className='email'>
						<input
							className='input'
							type='email'
							name='email'
							value={values.email}
							placeholder='Email...'
							onChange={handleChange}
						></input>
					</div>
					<div className='password'>
						<input
							className='input'
							type='password'
							name='password'
							value={values.password}
							placeholder='Password...'
							onChange={handleChange}
						></input>
					</div>
					<div className='age'>
						<input
							className='input'
							type='number'
							name='age'
							value={values.age}
							placeholder='Age...'
							onChange={handleChange}
						></input>
					</div>
					<label className='country-label'>Choose your country </label>
					<div className='country'>
						<Select
							className='country-select'
							options={options}
							name='country'
							value={value}
							onChange={changeHandler}
						/>
					</div>
					<label htmlFor='gender' className='gender-label'>
						Gender
					</label>
					<div className='gender'>
						<div>
							<input
								type='radio'
								name='gender'
								onChange={handleChange}
								value='Male'
							/>
							<label htmlFor='male'>Male</label>
						</div>
						<div>
							<input
								type='radio'
								name='gender'
								onChange={handleChange}
								value='Female'
							/>
							<label htmlFor='female'>Female</label>
						</div>
						<div>
							<input
								type='radio'
								name='gender'
								onChange={handleChange}
								value='Other'
							/>
							<label htmlFor='other'>Other</label>
						</div>
					</div>
					<div className='role'>
						<select onChange={selectDropdown} className='role_select'>
							<option selected value=''>
								Select Role...
							</option>
							<option value='Admin'>Admin</option>
							<option value='Patient'>Patient</option>
							<option value='Pharmacist'>Pharmacist</option>
							<option value='Physician'>Physician</option>
						</select>
					</div>
					<div>
						<button className='submit' type='submit' onClick={handleFormSubmit}>
							<BsShieldLockFill style={{ position: 'absolute', left: '5%' }} />{' '}
							SIGNUP
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
