import React from "react";


export default class Scores extends React.Component {
	constructor(props)
	{
		super(props)
		this.renderScore = this.renderScore.bind(this)
	}
	renderScore(s)
	{
		return (<div key={s.data.name + ":" + s.data.score } class="menu-element score"> {s.data.name + ": " + s.data.score }</div>)
	}
	render() {
		return (
			<div class="grid grid-menu scores">
				{/*<div class="close-menu"></div>*/}
				<h1>Best scores </h1>
				{this.props.scoreList.map(this.renderScore)}
				<div class="ctas">
					<div class="btn" onClick={(e) => { e.preventDefault(); this.props.back_to_game() }}>ok</div>
				</div>
			</div>
		)
	}
}