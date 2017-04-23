import React from "react";


export default class HowTo extends React.Component {
	constructor(props)
	{
		super(props)
	}

	render() {
		return (
			<div class="grid grid-menu howto">
				{/*<div class="close-menu"></div>*/}
				<h1>How to play </h1>
				<div class="menu-element">
					<p>Follow the track of the thief from the bottom to the top of the grid. you can draw your way to the top!</p>
                    <p> On desktop click on the first cell of the track and release on the last.  On mobile simply draw your way by touching the cells on the path</p>
                    <p>Good Luck! :)</p>
				</div>
				<div class="ctas">
					<div class="btn" onClick={(e) => { e.preventDefault(); this.props.back_to_game() }}>ok</div>
				</div>
			</div>
		)
	}
}