import React from 'react'
import Cell from './cell'

export default class Grid extends React.Component
{
	constructor(props)
	{
		super(props)
		this.renderCell = this.renderCell.bind(this)
		this.renderLine = this.renderLine.bind(this)
		this.start = this.start.bind(this)
		console.log(this.props)
	}



	renderLine(line)
	{
		return(
			<div class="ln"  key={"ln"+line[0].i}>{line.map(this.renderCell)}</div>
			)
	}
	
	renderCell(cell)
	{
		return (<Cell key={cell.i +"_"+ cell.j} i={cell.i } j={cell.j } hasBeenVisited={cell.hasBeenVisited} isOnThePath={cell.isOnThePath} try_cell={this.props.try_cell} showHint={cell.showHint} lvl={this.props.lvl}/>)

	}
	
	start(e)
	{
		e.preventDefault()
		this.props.game_start()
	}

	render()
	{
		console.log('render Grid' )		
		var classes = "grid grid-" + this.props.grid.length
		var hintBarC = "hint-progress" 
		var transitionDuration = "0s"
		if(this.props.hintMode == true)
		{
			classes +=" hint-mode"
			hintBarC += " active"
			transitionDuration = this.props.showLength + "s"
		}
		return(
		
							<div class={classes}>
								{this.props.grid.map( this.renderLine)}
							</div>
		)
	}

	componentDidMount()
	{

		var grid = document.getElementsByClassName("grid");
		var mouseHelp = document.getElementsByClassName('mouseHelp')
		var mouseTarget
		var mousedownFn = (e)=>{
			this.props.mouse_down()
			if(e.target.classList.contains("cell"))
				e.target.click()
		}
		var mouseUpFn = (e)=>{
			this.props.mouse_up()
			console.log("released")
		}

		var mouseMoveFn = (e)=>{
			e.preventDefault()
			if(this.props.isMousePressed)
			{
				if(e.target != mouseTarget && e.target.classList.contains("cell"))
				{
					mouseTarget = e.target
					console.log(e)
					mouseTarget.click()
				}
				mouseHelp[0].innerHTML = e.pageX + " " + e.pageY + " " + this.props.isMousePressed
			}
		}
		var handleLeave=(e)=>{
			console.log("touch leave")
		}

		//handle mobile touches


		
		if(grid.length > 0)
		{
			grid = grid[0]
			if (grid.addEventListener){
			  grid.addEventListener('mousedown', mousedownFn, false)
			  grid.addEventListener('mouseup', mouseUpFn, false)
			  grid.addEventListener('mousemove', mouseMoveFn, false)

			  //touch events
/*			  grid.addEventListener("touchstart", touchdownFn, false);
			  grid.addEventListener("touchend", touchUpFn, false);
			  grid.addEventListener("touchcancel", touchcancelFn, false);
			  grid.addEventListener("touchleave", handleLeave, false);
			  grid.addEventListener("touchmove", touchMoveFn, false);
*/


			} else if (grid.attachEvent) {
			  grid.attachEvent('onmousedown', mousedownFn)
			  grid.addEventListener('onmouseup', mouseUpFn, false)
			  grid.addEventListener('onmousemove', mouseMoveFn, false)
			}

		}


		console.log(grid)
		
	}
}
