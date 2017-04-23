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
		this.updateCellsArrays = this.updateCellsArrays.bind(this)
		this.whichIsTarget = this.whichIsTarget.bind(this)
		this.isOnPreviousCell = this.isOnPreviousCell.bind(this)
		this.allCells = []
		this.currentNbCells = 0
		

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

	/**
	*	this function generate arrays of cells sorted by their position
	*	those array are used to determine over which cell the touch is 
	*	it is necessary because the target never change on touchmove event
	*/
	updateCellsArrays()
	{

		var cells = document.getElementsByClassName('cell')

		if(cells.length > this.currentNbCells)
		{//number of cells has increased du to level change
			var arCells = []
			for (var i = 0; i < cells.length; i++) {
				arCells.push(cells[i])
			}
			this.allCells = arCells.sort((a, b) =>{
				if(a.offsetTop < b.offsetTop)
				{ //a is lower
					return -1
				}else if(a.offsetTop > b.offsetTop)
				{//a is bigger than b
					return 1
				}else if(a.offsetLeft < b.offsetLeft)
				{
					return -1
				}else if(a.offsetLeft > b.offsetLeft)
				{
					return 1
				}
				return -1
			})
			this.allCellsY = arCells.sort((a, b) =>{
				if(a.offsetLeft < b.offsetLeft)
				{//a is lower
					return -1
				}else if(a.offsetLeft > b.offsetLeft)
				{//a is bigger than b
					return 1
				}else if(a.offsetTop < b.offsetTop)
				{ //a is lower
					return -1
				}else if(a.offsetTop > b.offsetTop)
				{//a is bigger than b
					return 1
				} 
				return -1
			})
		}
	}

	whichIsTarget(x, y) {

		if(Math.abs(y - this.allCells[0].offsetTop) < Math.abs(y - this.allCells[this.allCells.length - 1].offsetTop))
		{//position is closest to the beginig of the array (because of the sort)
			for (var i = 0; i < this.allCells.length; i++) {
				if(this.allCells[i].offsetTop < y && this.allCells[i].offsetTop + this.allCells[i].offsetHeight > y && this.allCells[i].offsetLeft < x && this.allCells[i].offsetLeft + this.allCells[i].offsetWidth > x)
				{
					var result = this.allCells[i]
					this.allCells.splice(i, 1)
					return result
				}
			}
		}else
		{//position is closest to the end of the array. Because of the sort
			for (var i = this.allCells.length - 1 ; i >= 0 ; i--) {
				if(this.allCells[i].offsetTop < y && this.allCells[i].offsetTop + this.allCells[i].offsetHeight > y && this.allCells[i].offsetLeft < x && this.allCells[i].offsetLeft + this.allCells[i].offsetWidth > x)
				{
					var result = this.allCells[i]
					this.allCells.splice(i, 1)
					return result
				}
			}
		}

		return false
	}
	isOnPreviousCell(x, y, previousCell)
	{
		if(previousCell.offsetTop < y && previousCell.offsetTop + previousCell.offsetHeight > y && previousCell.offsetLeft < x && previousCell.offsetLeft + previousCell.offsetWidth > x)
		{
			return true
		}
		return false
	}


	componentDidMount()
	{

		var grid = document.getElementsByClassName("grid");
		var mouseHelp = document.getElementsByClassName('mouseHelp')

		/*allow tracking of mouse moves with left click maintained*/
		var mouseTarget
		var mousedownFn = (e)=>{
			if(!this.props.hintMode)
			{
				this.props.mouse_down()
				if(e.target.classList.contains("cell"))
					e.target.click()
			}
		}
		var mouseUpFn = (e)=>{
			this.props.mouse_up()
		}

		var mouseMoveFn = (e)=>{
			e.preventDefault()
			if(!this.props.hintMode && this.props.isMousePressed)
			{
				if(e.target != mouseTarget && e.target.classList.contains("cell"))
				{
					mouseTarget = e.target
					//console.log(e)
					mouseTarget.click()
				}
				if(mouseHelp.length > 0)
					mouseHelp[0].innerHTML = e.pageX + " " + e.pageY + " " + this.props.isMousePressed
			}
		}


		/* allow touch events*/

		//init  cells array for touch events
		this.updateCellsArrays()


		var handleLeave=(e) => {
			//console.log("touch leave")
		}
		var touchTargets = {} 
		//handle mobile touches
		var touchdownFn = (e) => {
			e.preventDefault()
			if(!this.props.hintMode)
			{
				for (var i = 0; i < e.changedTouches.length; i++) {
					if(!touchTargets[e.changedTouches[i].identifier])
					{
						touchTargets[e.changedTouches[i].identifier] = e.changedTouches[i].target
						e.changedTouches[i].target.click()
					}
				}
			}
			
		}

		//when touch stop
		var touchUpFn = (e) => {
			if(e.changedTouches){
				for (var i = 0; i < e.changedTouches.length; i++) {
					delete touchTargets[e.changedTouches[i].identifier]
				}
			}		
		}



		


		//on touch move
		var touchMoveFn = (e) => {
			if(!this.props.hintMode)
			{
				for (var i = 0; i < e.changedTouches.length; i++) {
					if(mouseHelp.length > 0)
						mouseHelp[0].innerHTML =  e.changedTouches[i].pageX + " " +  e.changedTouches[i].pageY
					if(!this.isOnPreviousCell(e.changedTouches[i].pageX ,  e.changedTouches[i].pageY, touchTargets[e.changedTouches[i].identifier]))
					{
						var currentTarget = this.whichIsTarget(e.changedTouches[i].pageX ,  e.changedTouches[i].pageY)
						if(currentTarget && touchTargets[e.changedTouches[i].identifier] != currentTarget)
						{
							//console.log("targetChanged")
							touchTargets[e.changedTouches[i].identifier] = currentTarget
							currentTarget.click()
						}
					}
				}
			}
		}


		//event binding
		if(grid.length > 0)
		{
			grid = grid[0]
			if (grid.addEventListener){
			  grid.addEventListener('mousedown', mousedownFn, false)
			  grid.addEventListener('mouseup', mouseUpFn, false)
			  grid.addEventListener('mousemove', mouseMoveFn, false)

			  //touch events
			  grid.addEventListener("touchstart", touchdownFn, false);
			  grid.addEventListener("touchend", touchUpFn, false);
			  grid.addEventListener("touchcancel", touchUpFn, false);
			  grid.addEventListener("touchleave", touchUpFn, false);
			  grid.addEventListener("touchmove", touchMoveFn.bind(this), false);



			} else if (grid.attachEvent) {
			  grid.attachEvent('onmousedown', mousedownFn)
			  grid.addEventListener('onmouseup', mouseUpFn, false)
			  grid.addEventListener('onmousemove', mouseMoveFn, false)
			}

		}


		//console.log(grid)
		
	}




	componentDidUpdate()
	{
		this.updateCellsArrays()
	}
}
