import React from "react";


export default class Mask extends React.Component {
	constructor(props)
	{
		super(props)
	}

  render() {
    if(this.props.isFinished)
    { 
      return (
          <div>
           <div class="hidder"></div>
           <div class="mask mask-game-over">
            <div class="mask-title-container"><h1 class="menu-title game-over">Game over</h1></div>
           </div>
          </div> 
       )
    }
  else if(!this.props.hasStarted)
  {
      return (
         <div>
          <div class="hidder"></div>
            <div class="mask ">
            <div class="mask-title-container"><h1 class="menu-title welcome">Welcome</h1></div>
          </div>
        </div>
        )
  }
  else{
      return (<div></div>)
    }
  }
}