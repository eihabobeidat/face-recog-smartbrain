import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ url , box }) => {
	return (
		<div className='ftc'>
			<div className='absolute mt2'>
				<img id='inputimage' src={url} alt='' width='550px' height='auto' />
				<div style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol }} className='bounding-box'></div>
			</div>
		</div>
	);
}


export default FaceRecognition;