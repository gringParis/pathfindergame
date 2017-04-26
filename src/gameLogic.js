class GameLogic{


	constructor()
	{
		this.getGrid = this.getGrid.bind(this)
		this.changeLevel = this.changeLevel.bind(this)
		this.endHintMode = this.endHintMode.bind(this)
		this.play = this.play.bind(this)
		this.start = this.start.bind(this)
		this.isLvlFinished = this.isLvlFinished.bind(this)
		this.initProps = this.initProps.bind(this)
		this.makePath = this.makePath.bind(this)
		this.getNextPossibleCells = this.getNextPossibleCells.bind(this)
		this.isThereAdjacentCellInPath = this.isThereAdjacentCellInPath.bind(this)
		this.isInPath = this.isInPath.bind(this)
		this.props = this.initProps(true)
		this.enterPlayerName = this.enterPlayerName.bind(this)
	}

	/**
	* this method allow to init the props of a game
	*/
	initProps(isFirst)
	{
		var props = {
    
		    lvl: 4,
		    lvlMax : 6,
		    lvlMin : 4,
		    showLength: 3.5,
		    isFinished: false,
		    /*isError: false,*/
		    isReadyToStart: false,
		    isFinishedLvl: false,
		    remainingCells: 2,
		    hintMode: false,
		    hasStarted:true,
		    lifes:1,
		    score: 0,
		    grid: [
		      [{
		        i: 0,
		        j: 0,
		        isOnThePath: false,
		        hasBeenVisited: false
		      },
		      {
		        i: 0,
		        j: 1,
		        isOnThePath: true,
		        hasBeenVisited: false
		      }],
		      [{
		        i: 1,
		        j: 0,
		        isOnThePath: false,
		        hasBeenVisited: false
		      },
		      {
		        i: 1,
		        j: 1,
		        isOnThePath: true,
		        hasBeenVisited: false
		      }],
		    ]
		  }
		  if(isFirst)
		  	props.hasStarted = false
		//generate a path
		var path = this.makePath(props.lvl)
		props.grid = this.getGrid(props.lvl, isFirst, path)
		props.path = path
		return props
	}

	/**
	* Build a grid for a specified level and a path
	*/
	getGrid(lvl, isFirst, path)
	{
		////console.log(lvl)
		let lines = []
		for (var i = 0; i < lvl; i++) {
			lines[i] = []
			for (var j = 0; j < lvl; j++) {
				lines[i][j] = {
			        i,
			        j,
			        hasBeenVisited: false
			      }
			}
		}
		
		for (var i = 0; i < path.length; i++) {
			lines[path[i].i][path[i].j].isOnThePath = true
	        if(!isFirst)
	        	lines[path[i].i][path[i].j].showHint = true
		}
		
		return lines.reverse()
	}

	/**
	*	Start a new game
	*/
 	start(state)
 	{
 		if(state.isFinished)
 		{
 			state = this.initProps(false)
 		}else{
		  	state.hasStarted = true
 		}

 		for (var i = 0; i < state.grid.length; i++) {
			for (var j = 0; j < state.grid.length; j++) {
				if(state.grid[i][j].isOnThePath == true)
				{
					state.grid[i][j].showHint = true
				}
			}			
		}
 		state.hintMode = true
 		return state
 	}


 	/**
 	* try a cell and process the game
 	*/
	play(i , j, state)
	{
		//console.log("begin play")
		//reverse array
		i = state.grid.length-1 - i
		state.grid[i][j].hasBeenVisited = true
		if(state.grid[i][j].isOnThePath == true)
		{//the selected cell is correct
			state.score = state.score + state.lvl - state.lvlMin + 1
			if(this.isLvlFinished(state))
	        {
				state.isFinishedLvl = true
			}
		}else
		{//the cell is wrong
			/*state.isError =true*/
			state.lifes--
			if(state.lifes <= 0)
			{
				state.isFinishedLvl =true
	        	state.isFinished = true
			}
		}
		return state
	}

	/**
	* test if the level is finished
	*/
	isLvlFinished(state)
	{
		var remainingCells = 1
		remainingCells = state.grid.reduce(
	    (sum, line)=>{
	      return sum + line.filter((cell)=>{return cell.isOnThePath && !cell.hasBeenVisited}).length
	    }, 0)
		if(remainingCells == 0)
		{
			//console.log("lvl finished")
			return true
		}
		return false
	}

	/**
	*	Change to next level
	*/
	changeLevel(state)
	{
		state.lvl++
		state.lifes++
		//generate a path
 		state.path = this.makePath(state.lvl)
 		//create new grid
		state.grid = this.getGrid(state.lvl, false, state.path)
		//trigger hint mode for this level
		state.isFinishedLvl = false
		state.showLength = state.showLength + 0.25
		state.hintMode = true

		//console.log(state)
		return state
	}

	/**
	*	Emit the end of the hint mode after duration is reached
	*/
	endHintMode(state)
	{
		for (var i = 0; i < state.grid.length; i++) {
			for (var j = 0; j < state.grid.length; j++) {
				if(state.grid[i][j].showHint == true)
				{
					state.grid[i][j].showHint = false
				}
			}			
		}
		state.hintMode = false
		return state
	}

	/**
	* create a path from the bottom to the top of the grid
	* there are some constraints to respect, from one cell you can only go to the cell you come from and an other.
	* we use backtraking to prevent to finish on a dead end... 
	*/
	makePath(lvl)
	{
		
		//console.log("pathMaker")
		//init randomly a first cell at the bottom of the grid
		var nextCell = { i : 0, j : Math.floor( Math.random() * lvl), stop:false}
		var path = []
		var exit = 0
		var backTrackCp = 0
		var resetCp = 0
		while(!nextCell.stop)
		{//choose one cell
			//console.log("pathMaker loop")
			//console.log("current path")
			//console.log(path)
			//console.log("next CELL ON PATH : ")	
			////console.log(nextCell.i + " " + nextCell.j)
			//console.log(nextCell)
			path.push(nextCell)
			nextCell.possibleCells = this.getNextPossibleCells(lvl, nextCell, path)
			var nextI = 0
			//put choosen cell into the path
			if(nextCell.possibleCells.length > 1)
			{ // there are several next possible cells we pick one randomly
				//console.log("choose next random")
				nextI = Math.floor( Math.random() * nextCell.possibleCells.length)					
				nextCell = nextCell.possibleCells[nextI]		
			}else if(nextCell.possibleCells.length == 1)
			{//no choice to make here
				//console.log("1 choice")
				nextCell = nextCell.possibleCells[nextI]
			}else
			{//no solution to this path so we bakctrack
				//console.log("#### BACKTRACK BACKTRACK BACKTRACK BACKTRACK ####")
				//we introduce a reset to avoid searching too long a possible path. When the size of the grid increase, lots of path can finish on a dead end. 
				// to avoid the algorithm to search too long for a path, we stop search after a certain amout of backtracks ( based on current grid size (lvl))
				backTrackCp++
				if(backTrackCp > lvl * 5)
				{
					//console.log("backtrack reset")
					var nextCell = { i : 0, j : Math.floor( Math.random() * lvl), stop:false}
					path=[]
					backTrackCp = 0
					resetCp++
				}else
				{
					var isRotten = true // the selected cell leads only to a dead ends
					while(isRotten)
					{
						const rottenCell = path.pop()
						path[path.length - 1].possibleCells = path[path.length - 1].possibleCells.filter(
							(elem)=>{
								//we remove rotten cell from possible cell of previous possible cells
								if(elem.i == rottenCell.i && elem.j == rottenCell.j)
									return false
								return true
							}
						)
						//console.log("filtered")
						//console.log(path[path.length - 1].possibleCells)
						//if there is no other cells, we backtrack again else we stop
						if(path[path.length - 1].possibleCells.length > 0)
						{
							isRotten = false
						}
					}
					//then we choose an other path
					nextCell = path[path.length - 1]
					if(nextCell.possibleCells.length > 1)
					nextI = Math.floor( Math.random() * nextCell.possibleCells.length)			
					else if(nextCell.possibleCells.length == 1)
						nextCell = nextCell.possibleCells[nextI]
					else{
						//console.log("backtrack exception")
						return path
					}
				}
				

			}
			if(resetCp >= 2)
			{
				return path
			}
			exit++
		}
		//console.log(nextCell)
		//console.log("final path: ")
		//console.log(path)
		return path
	}
	
	/**
	* get next possible cells for a cell and a path
	* there should not be any loop in the path we draw...
	*/
	getNextPossibleCells(lvl, cell, path)
	{
		
		var nextPossibleCells = []
		const i = cell.i
		const j = cell.j
			if(i == lvl - 1)
			{//it's on the last line. So the path could stop of continue
				//console.log("can finish")
				nextPossibleCells.push({stop : true})
			}
			if( j - 1 >= 0)
			{//can go left
				let possible = { i, j : j - 1}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					//console.log("can go left")
					nextPossibleCells.push(possible)
				}
			}
			if(j + 1 < lvl)
			{//can go right
				let possible = { i, j : j + 1}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					//console.log("can go right")
					nextPossibleCells.push(possible)
				}
			}
			if( i - 1 > 0)
			{//can go bottom
				let possible = { i : i - 1, j}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					//console.log("can go bottom")
					nextPossibleCells.push(possible)
				}
			}
			if( i + 1 <= lvl - 1)
			{//can go bottom
				let possible = { i : i + 1, j}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					//console.log("can go top")
					nextPossibleCells.push(possible)
				}
			}
		
		
		//console.log("nextPossibleCells")
		//console.log(nextPossibleCells)
		return nextPossibleCells
	}
	/**
	* is a possible cell already on the path? 
	* this prevent loops
	*/
	isInPath(possible, path)
	{
		for (var i = 0; i < path.length; i++) {
			if(possible.i == path[i].i && possible.j == path[i].j)
			{
				return true
			}
		}
		return false
	}

	isThereAdjacentCellInPath (possible, cell, path)
	{
		var isProblematicCell = false
		const lastCell = path[path.length - 1]


		for (var i = 0; i < path.length && !isProblematicCell; i++) {
			let previousCell = path[i]
			var isCurrentCell = previousCell.i == cell.i && previousCell.j == cell.j
			if(isCurrentCell)
			{ // we skip, it s a normal case
				////console.log("current cell")
				break
			}
			if(previousCell.i == possible.i + 1 && previousCell.j == possible.j )
			{//is there yet in the path a cell on top of the possible cell
				//console.log("adjacent top")
				return true
			}

			if(previousCell.i == possible.i - 1 && previousCell.j == possible.j )
			{//is there yet in the path a cell at the bottom of the possible cell
				//console.log("adjacent bottol")
				return true
			}

			if(previousCell.i == possible.i  && previousCell.j == possible.j - 1 )
			{//is there yet in the path a cell on the left of the possible cell
				//console.log("adjacent left")
				return true
			}

			if(previousCell.i == possible.i  && previousCell.j == possible.j + 1 )
			{//is there yet in the path a cell on the right of the possible cell
				//console.log("adjacent right")
				return true
			}
		}
		return isProblematicCell
	}

	enterPlayerName(name, state)
	{
		state.playerName = name
		state.isReadyToStart = true
		return state
	}

}

export default new GameLogic()