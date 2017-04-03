import React from 'react'
import Cell from './cell'
import LvlBar from './lvlBar'
import ContextMenu from './contextMenu'
import Mask from './mask'

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
			<div class="ct">
				<h1 class="title">Gring's pathfinder</h1>
				<div class="main">
					<div class="main-game">
						<div class="lvl-bar-container"><LvlBar lvl={this.props.lvl} lvlMin={this.props.lvlMin} /></div>
						<div class="grid-container">
							<div class={"hint-time"}><div class={hintBarC} style={{transitionDuration}}></div></div>
							<div class={classes}>
								{this.props.grid.map( this.renderLine)}
							</div>
						</div>
					</div>

					
					<ContextMenu isFinished={this.props.isFinished} hasStarted={this.props.hasStarted} game_start={this.props.game_start}/>
				</div>
				<Mask isFinished={this.props.isFinished} hasStarted={this.props.hasStarted} />
			</div>
		)
	}

	componentDidMount()
	{
		
	}
}
