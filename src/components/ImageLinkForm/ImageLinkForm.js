import React from 'react';
import './ImageLinkForm.css'

//instead of props.on/inputChange ===> just destructure it with {}
const ImageLinkForm = ({onInputChange,onSubmit}) => {
	return (
		<div className="tc">
			<p className="f3">
				{'This magic brain will detect your face, give it a try!'}
			</p>
			<div className="center">
				<div className=" center ba4 br3">
					<input
					onChange={onInputChange}
					type="url" 
					placeholder="URL Here.." 
					className="f4 pa2 w-70" />
					<button onClick={onSubmit} className="f4 link ph3 pv2 grow dib white bg-light-purple">Detect</button>
				</div>
			</div>
		</div>
	);
}


export default ImageLinkForm;