import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import '../Assets/Styles/users.css';

export default function Dashboard() {
	const navigate = useNavigate();

	const [datas, setDatas] = useState([]);

	const user = localStorage.getItem('user');
	if (!user) navigate('/');

	useEffect(() => {
		axios
			.get(`http://localhost:5500/api/v1/users/all`)
			.then(function (response) {
				toast.success(response?.data?.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setDatas(response?.data?.datas?.Payload);
			})
			.catch(function (error) {
				toast.error(error.response?.data?.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	}, []);

	const csvmaker = function () {
		let arrayData = [
			[
				'ID',
				'Firstname',
				'Lastname',
				'Email',
				'Gender',
				'Age',
				'Country',
				'Role',
			],
			...datas.map(Object.values),
		];

		let csvContent =
			'data:text/csv;charset=utf-8,' +
			arrayData.map(e => e.join(',')).join('\n');
		let encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	};

	return (
		<div className='main'>
			<Navbar />
			<div
				style={{
					margin: '30rem 0 0 35rem',
					transform: 'translate(-50%, -50%)',
					display: 'flex',
					width: '60%',
					height: '90vh',
					padding: '2rem',
					flexDirection: 'column',
					flex: '2',
				}}
			>
				<h1 style={{ marginBottom: '4rem', textAlign: 'center' }}>App Users</h1>
				<div className='datas'>
					<ul className='datas_1 headers'>
						{datas.length &&
							Object.keys(datas[0])
								.filter(x => x !== 'id')
								.map(k => <li>{k}</li>)}
					</ul>
					{datas.length &&
						datas.map(data1 => {
							const lis = [];
							for (const key in data1) {
								if (Object.hasOwnProperty.call(data1, key) && key !== 'id') {
									const element = data1[key];
									lis.push(<li>{element}</li>);
								}
							}
							return <ul className='datas_1'>{lis}</ul>;
						})}
				</div>
				<button
					style={{
						width: '20%',
						height: '3rem',
						marginTop: '2rem',
						background: 'none',
						fontWeight: 'bolder',
						fontSize: 'large',
						color: 'white',
						border: '1px solid',
						backgroundColor: 'blue',
						cursor: 'pointer',
						borderRadius: '10px',
						alignSelf: 'center',
					}}
					type='button'
					onClick={csvmaker}
				>
					DOWNLOAD CSV
				</button>
			</div>
		</div>
	);
}
