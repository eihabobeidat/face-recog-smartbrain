import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return (
		<div className='logo'>
			<Tilt className="Tilt br2 br-100 shadow-2" options={{ max : 40 , easing: "cubic-bezier(.03,.98,.52,.99)", speed: 300, perspective: 500 }} style={{ height: 110, width: 110 }} >
 				<div className="Tilt-inner"><img style={{ paddingTop : '10px' }} src={brain} alt="brainLOGO"/></div>
			</Tilt>
		</div>
		)
}


export default Logo;