import React from "react";


export default class HowTo extends React.Component {
	constructor(props)
	{
		super(props)
    	this.nameChanged = this.nameChanged.bind(this)
	}
	nameChanged(e)
	  {
	    if(e.nativeEvent.keyCode == 13)
	    {
	      this.props.enter_player_name(document.getElementById("player-name").value)
	    }
	  }

	render() {
		return (
			<div class="grid grid-menu howto">
				{/*<div class="close-menu"></div>*/}
				<h1>Welcome </h1>

				<div class="menu-element">
					<p>Follow the track of the thief from the bottom to the top of the grid. you can draw your way to the top!</p>
                    <p> On desktop click on the first cell of the track and release on the last.  On mobile simply draw your way by touching the cells on the path</p>
                    <p>But first thank you to enter your player name:</p>
				</div>
                <input type="text" placeholder="player name" maxLength="10" name="player-name" id="player-name" onKeyPress={(e)=>{this.nameChanged(e)}} />
				
			</div>
		)
	}

	componentDidMount(){
		document.getElementById("player-name").focus();
	}
}