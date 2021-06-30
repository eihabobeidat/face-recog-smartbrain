import React from 'react';

const Navigation = ({signingIn , signOut}) => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
			<p 
			onClick={() => {
				signingIn(false);
				signOut();
			}} 
			className='f3 link dim black pa1 pointer'>Sign Out</p>
		</nav>

	);
}


export default Navigation;