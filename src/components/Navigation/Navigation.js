import React from 'react';

const Navigation = ({signingIn}) => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
			<p onClick={signingIn} className='f3 link dim black pa3 pointer'>Sign Out</p>
		</nav>

	);
}


export default Navigation;