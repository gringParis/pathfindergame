import React from "react";


export default class Mask extends React.Component {
	constructor(props)
	{
		super(props)
	}

  render() {

    if(this.props.mode == "game" && this.props.isFinished)
    { 
      return (
          <div>
           <div class="hidder"></div>
           <div class="mask mask-game-over">
            <div class="mask-title-container"><h1 class="menu-title game-over">Game over</h1></div>
            <div class="how-to-play">
                  <div class="how-to-play-in">
                    <p>Congratulations. Your score is {this.props.score} and your best rank is {this.props.rank}!</p>                   
                  </div>
                </div>
           </div>
          </div> 
       )
    }
    else if(this.props.mode == "game" && !this.props.hasStarted)
    {
      var classes = "hide"
      if(!this.props.isReadyToStart)
      {
        classes = "display"
      }

        return (
           <div>
            <div class="hidder"></div>
              <div class="mask ">
              <div class="mask-title-container"><h1 class="menu-title welcome">Menu</h1></div>
              
            </div>
          </div>
          )
    }
    else{
        return (<div></div>)
      }
  }

}