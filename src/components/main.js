import React from 'react'
import GridGame from './gridGame'
import LvlBar from './lvlBar'
import ContextMenu from './contextMenu'
import Mask from './mask'
import Scores from './scores'

export default class Main extends React.Component
{
	constructor(props)
	{
		super(props)
		this.start = this.start.bind(this)
		console.log(this.props)
	}


	renderGrid()
	{
		if(this.props.nav.menu == "game")
		{
			return (<GridGame grid={this.props.game.grid} hintMode={this.props.game.hintMode} lvl={this.props.game.lvl} try_cell={this.props.try_cell} mouse_down={this.props.mouse_down} mouse_up={this.props.mouse_up} isMousePressed={this.props.control.pressed} />)
		}else if(this.props.nav.menu == "scores")
		{
			return (<Scores back_to_game={this.props.back_to_game} />)
		}

	}

	start(e)
	{
		e.preventDefault()
		this.props.game_start()
	}

	render()
	{
		console.log('render Main' )		
		var classes = "grid grid-" + this.props.game.grid.length
		console.log(this.props.game.showLength)
		var hintBarC = "hint-progress" 
		var transitionDuration = "0s"
		var hintClass = ""
		if(this.props.game.hintMode == true)
		{
			hintClass = " hint-mode"
			classes +=" hint-mode"
			hintBarC += " active"
			transitionDuration = this.props.game.showLength + "s"
		}
		return(
			<div class="ct">
				<div class="vertical-middle">
					<div class={"main " + this.props.nav.menu + hintClass}>
						<div class="main-game">
							<div class={"lvl-bar-container " + this.props.nav.menu}><LvlBar lvl={this.props.game.lvl} lvlMin={this.props.game.lvlMin} score={this.props.game.score} /></div>
							<div class="grid-container">
								<div class={"hint-time"}><div class={hintBarC} style={{transitionDuration}}></div></div>
									{this.renderGrid()}
							</div>
						</div>

						
						<ContextMenu mode={this.props.nav.menu} isFinished={this.props.game.isFinished} hasStarted={this.props.game.hasStarted} game_start={this.props.game_start} show_scores={this.props.show_scores}/>
					</div>
					<Mask mode={this.props.nav.menu} isFinished={this.props.game.isFinished} hasStarted={this.props.game.hasStarted} />
					{/*<div class="mouseHelp">ggg</div>*/}
					<div class="scoreHelp help">{"Score: " + this.props.game.score}</div>
				</div>
			</div>
		)
	}

}
