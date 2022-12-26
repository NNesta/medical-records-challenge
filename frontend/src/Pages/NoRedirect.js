import React from 'react';
import img from '../Assets/images/nothing.png';

export default function NoRedirect() {
	return (
		<div>
			<div
				style={{
					position: 'absolute',
					top: '40% !important',
					display: 'flex',
					flexDirection: 'column',
				}}
				className='container'
			>
				<img src={img} alt='not-found' />
				<h1
					style={{
						color: 'red !important',
						height: '4rem',
						marginTop: '4rem',
						opacity: '1',
					}}
				>
					Page not found ❌❌❌❌❌❌❌
				</h1>
			</div>
		</div>
	);
}
