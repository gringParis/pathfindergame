import React from "react";


export default class Cell extends React.Component {
	constructor(props)
	{
		super(props)
	}
	tryCell(e)
	{

	}
  render() {
  	var classes = "cell "
  	if (this.props.hasBeenVisited && this.props.isOnThePath)
  		classes +="visited"
  	else if(this.props.hasBeenVisited && !this.props.isOnThePath)
  		classes +="error"
  	else if(this.props.showHint)
      classes +="hint"
    else
  		classes +="def"
    const size = (100 / this.props.lvl) -0.4
    return (
        <div id={"cell-" + this.props.i + "-" + this.props.j}  class={classes} style={{'width' : size + '%', 'paddingBottom': size + '%'}}onClick={(e) => { e.preventDefault(); if(!this.props.showHint) {this.props.try_cell(this.props.i,  this.props.j)} }}>
          
        </div>
    );
  }
}