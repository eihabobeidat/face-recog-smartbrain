import React from 'react';


const Rank = () => {
	return (
		<div>
			<div className="white f3 tc">
				{"$(username), your Rank is:"}
			</div>
			<div className="white f1 b tc">
				{"#$(Rank)"}
			</div>
		</div>
	);
}


export default Rank;