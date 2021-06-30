import React from 'react';


const Rank = ({ userName, rank }) => {
	return (
		<div>
			<div className="white f3 b tc">
				{`${userName}, your Rank is:`}
			</div>
			<div className="white f1 b tc">
				{`#${rank}`}
			</div>
		</div>
	);
}


export default Rank;