import React from 'react'
import GridGame from './gridGame'
import LvlBar from './lvlBar'
import ContextMenu from './contextMenu'
import Mask from './mask'
import Scores from './menuElements/scores'
import HowTo from './menuElements/howto'
import Credits from './menuElements/credits'
import Welcome from './menuElements/welcome'

export default class Main extends React.Component
{
	constructor(props)
	{
		super(props)
		this.start = this.start.bind(this)
	}


	renderGrid()
	{
		if(this.props.nav.menu == "game")
		{
			return (<GridGame grid={this.props.game.grid} hintMode={this.props.game.hintMode} lvl={this.props.game.lvl} try_cell={this.props.try_cell} mouse_down={this.props.mouse_down} mouse_up={this.props.mouse_up} isMousePressed={this.props.control.pressed} />)
		}else if(this.props.nav.menu == "scores")
		{
			return (<Scores back_to_game={this.props.back_to_game} scoreList={this.props.scores.list} />)
		}else if(this.props.nav.menu == "howtoplay")
		{
			return (<HowTo back_to_game={this.props.back_to_game} />)
		}else if(this.props.nav.menu == "credits")
		{
			return (<Credits back_to_game={this.props.back_to_game} />)
		}else if(this.props.nav.menu == "welcome")
		{
			return (<Welcome  enter_player_name={this.props.enter_player_name} />)
		}

	}

	start(e)
	{
		e.preventDefault()
		this.props.game_start()
	}

	render()
	{
		var classes = "grid grid-" + this.props.game.grid.length
		var hintBarC = "hint-progress" 
		var transitionDuration = "0s"
		var hintClass = ""
		var showGameOrMenu = "game"
		if(this.props.nav.menu != "game")
		{
			showGameOrMenu = "menu"
		}
		if(this.props.game.hintMode == true)
		{
			hintClass = " hint-mode"
			classes +=" hint-mode"
			hintBarC += " active"
			transitionDuration = this.props.game.showLength + "s"
		}
		return(
			<div class="ct">
				<div id="fb-root"></div>
				
				<script></script>

				<div class="vertical-middle">
					<div class={"main " + showGameOrMenu + hintClass}>
						<div class="main-game">
							<div class={"lvl-bar-container " + showGameOrMenu}><LvlBar lvl={this.props.game.lvl} lvlMin={this.props.game.lvlMin} score={this.props.game.score} lifes={this.props.game.lifes}/></div>
							<div class="grid-container">
								<div class={"hint-time"}><div class={hintBarC} style={{transitionDuration}}></div></div>
									{this.renderGrid()}
							</div>
							<div class={"scoreHelp help " + showGameOrMenu}>{"Score: " + this.props.game.score}</div>
						</div>

						
						<ContextMenu mode={this.props.nav.menu} isFinished={this.props.game.isFinished} hasStarted={this.props.game.hasStarted} game_start={this.props.game_start} show_menu={this.props.show_menu} isReadyToStart={this.props.game.isReadyToStart}/>
					</div>
					<Mask mode={this.props.nav.menu} isFinished={this.props.game.isFinished} hasStarted={this.props.game.hasStarted} isReadyToStart={this.props.game.isReadyToStart} score={this.props.game.score} rank={this.props.scores.rank} />
					{/*<div class="mouseHelp">ggg</div>*/}
					
				</div>

			</div>
		)
	}

	componentDidMount()
	{
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.9";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}

}
