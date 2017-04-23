import React from "react";


export default class ContextMenu extends React.Component {
	constructor(props)
	{
		super(props)
	}

  render() {
    if(this.props.mode == "game" && (this.props.isFinished || !this.props.hasStarted && this.props.isReadyToStart))
    return (
        <div class="context-menu-container">
            <div class="context-menu">
              <ul class="menu">
                <li class="menu-item"  onClick={(e)=>{e.preventDefault(); this.props.game_start()}}>Start Game</li>
                <li class="menu-item"  onClick={(e)=>{e.preventDefault(); this.props.show_menu("scores")}}>Leader Board</li>
                <li class="menu-item"  onClick={(e)=>{e.preventDefault(); this.props.show_menu("howtoplay")}}>How to play</li>
                <li class="menu-item"  onClick={(e)=>{e.preventDefault(); this.props.show_menu("credits")}}>Credits</li>
                <li class="menu-item"><div class="fb-share-button" data-href="http://gring.fr/pathfinder/" data-layout="button" data-size="small" data-mobile-iframe="false"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgring.fr%2Fpathfinder%2F&amp;src=sdkpreparse">Share</a></div></li>
              </ul>
            </div>
        </div>
    )
    else{
      return (<div></div>)
    }
  }
}