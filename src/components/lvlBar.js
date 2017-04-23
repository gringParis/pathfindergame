import React from "react";


export default class LvlBar extends React.Component {
	constructor(props)
	{
		super(props)
    this.renderSqrt = this.renderSqrt.bind(this)
	}
	tryCell(e)
	{

	}
  renderSqrt(id)
  {
    return(<div class="lvl"  key={"lvl"+id}></div> )
  }
  render() {
  	var sqrts = []
    for (var i = 0; i < (this.props.lifes); i++) {
      sqrts.push(i) 
    }
    return (
        <div class="lvlBar">
          <div class="lvlDigit"><span class="label">lvl</span>{this.props.lvl + 1 - this.props.lvlMin}</div>
          {sqrts.map( this.renderSqrt)}
        </div>
    );
  }
}