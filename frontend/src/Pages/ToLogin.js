import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/signup.css';

export default function SignupForm() {
	const nav = useNavigate();
	React.useEffect(() => {
		nav('/login');
	}, []);

	return <div className='container'></div>;
}
