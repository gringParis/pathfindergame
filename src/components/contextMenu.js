import React from "react";


export default class ContextMenu extends React.Component {
	constructor(props)
	{
		super(props)
	}

  render() {
    if(this.props.isFinished || !this.props.hasStarted)
    return (
        <div class="context-menu-container">
            <div class="context-menu">
              <ul class="menu">
                <li class="menu-item"  onClick={(e)=>{e.preventDefault(); this.props.game_start()  }}>Start Game</li>
                <li class="menu-item">Leader Board</li>
                <li class="menu-item">How to play</li>
                <li class="menu-item">Credits</li>
              </ul>
            </div>
          </div>
    )
    else{
      return (<div></div>)
    }
  }
}