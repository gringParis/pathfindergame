import React from "react";


export default class Scores extends React.Component {
	constructor(props)
	{
		super(props)
	}

	render() {
		return (
			<div class="grid grid-menu scores">
				{/*<div class="close-menu"></div>*/}
				<h1>Best scores </h1>
				<div class="score"> gring : 100</div>
				<div class="score"> gring : 99</div>
				<div class="ctas">
					<div class="btn" onClick={(e) => { e.preventDefault(); this.props.back_to_game() }}>ok</div>
				</div>
			</div>
		)
	}
}