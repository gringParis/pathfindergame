import React from "react";


export default class Credits extends React.Component {
	constructor(props)
	{
		super(props)
	}

	render() {
		return (
			<div class="grid grid-menu credits">
				<h1>Credits </h1>
				<div class="menu-element">Guillaume Ringwald</div>
				<div class="menu-element">my mail: <a href="mailto:g.ring.fr@gmail.com">g.ring.fr@gmail.com</a></div>
				<div class="menu-element">my linkedin: <a href="https://www.linkedin.com/in/guillaume-ringwald-b4809798/" >here</a></div>				
				<div class="ctas">
					<div class="btn" onClick={(e) => { e.preventDefault(); this.props.back_to_game() }}>ok</div>
				</div>
			</div>
		)
	}
}