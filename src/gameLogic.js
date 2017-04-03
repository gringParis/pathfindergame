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
	}


	initProps(isFirst)
	{
		var props = {
    
		    lvl: 3,
		    lvlMax : 6,
		    lvlMin : 3,
		    showLength: 5,
		    name: "pathFinder",
		    isFinished: false,
		    isError: false,
		    isFinishedLvl: false,
		    remainingCells: 2,
		    hintMode: false,
		    hasStarted:true,
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


	getGrid(lvl, isFirst, path)
	{
		console.log(lvl)
		let lines = []
		for (var i = 0; i < lvl; i++) {
			lines[i] = []
			for (var j = 0; j < lvl; j++) {
				lines[i][j] = {
			        i,
			        j,
			        hasBeenVisited: false
			      }
				/*if(j == 0)
				{
			        lines[i][j].isOnThePath = true
			        if(!isFirst)
			        	lines[i][j].showHint = true
				}*/
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
		console.log("begin play")
		//reverse array
		i = state.grid.length-1 - i
		state.grid[i][j].hasBeenVisited = true
		if(state.grid[i][j].isOnThePath == true)
		{//the selected cell is correct
			if(this.isLvlFinished(state))
	        {
				state.isFinishedLvl = true
			}
		}else
		{//the cell is wrong
			state.isError =true
	        state.isFinishedLvl =true
	        state.isFinished = true
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
			console.log("lvl finished")
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
		//generate a path
 		state.path = this.makePath(state.lvl)
 		//create new grid
		state.grid = this.getGrid(state.lvl, false, state.path)
		//trigger hint mode for this level
		state.isFinishedLvl = false
		state.showLength = state.showLength - 0.5
		state.hintMode = true

		console.log(state)
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


	makePath(lvl)
	{
		
		console.log("pathMaker")
		var nextCell = { i : 0, j : Math.floor( Math.random() * lvl), stop:false}
		var path = []
		var exit = 0
		var backTrackCp = 0
		var resetCp = 0
		while(!nextCell.stop)
		{//choose one cell
			console.log("pathMaker loop")
			console.log("CELL ON PATH : ")	
			//console.log(nextCell.i + " " + nextCell.j)
			console.log(nextCell)
			path.push(nextCell)
			nextCell.possibleCells = this.getNextPossibleCells(lvl, nextCell, path)
			var nextI = 0
			//put choosen cell into the path
			if(nextCell.possibleCells.length > 1)
			{
				console.log("choose next random")
				nextI = Math.floor( Math.random() * nextCell.possibleCells.length)					
				nextCell = nextCell.possibleCells[nextI]		
			}else if(nextCell.possibleCells.length == 1)
			{
				console.log("1 choice")
				nextCell = nextCell.possibleCells[nextI]
			}else
			{//no solution to this path so we bakctrack
				console.log("bakctrack")
				//we introduce a reset to avoid searching to long a possible path
				backTrackCp++
				if(backTrackCp > lvl * 5)
				{
					var nextCell = { i : 0, j : Math.floor( Math.random() * lvl), stop:false}
					resetCp++
				}else
				{
					var isRotten = true
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
						console.log("filtered")
						console.log(path[path.length - 1].possibleCells)
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
						console.log("backtrack exception")
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
		console.log(nextCell)
		console.log("final path: ")
		console.log(path)
		return path
	}
	

	getNextPossibleCells(lvl, cell, path)
	{
		
		var nextPossibleCells = []
		const i = cell.i
		const j = cell.j
		//test left or right only if not on first line
		/*if(cell.i > 0)
		{*/
			if(i == lvl - 1)
			{//it's on the last line
				console.log("can finish")
				nextPossibleCells.push({stop : true})
			}
			if( j - 1 >= 0)
			{//can go left
				let possible = { i, j : j - 1}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					console.log("can go left")
					nextPossibleCells.push(possible)
				}
			}
			if(j + 1 < lvl)
			{//can go right
				let possible = { i, j : j + 1}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					console.log("can go right")
					nextPossibleCells.push(possible)
				}
			}
			if( i - 1 > 0)
			{//can go bottom
				let possible = { i : i - 1, j}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					console.log("can go bottom")
					nextPossibleCells.push(possible)
				}
			}
			if( i + 1 <= lvl - 1)
			{//can go bottom
				let possible = { i : i + 1, j}
				if(!this.isInPath(possible, path) && !this.isThereAdjacentCellInPath(possible, cell, path))
				{
					console.log("can go top")
					nextPossibleCells.push(possible)
				}
			}
		
		/*}else{
			nextPossibleCells.push({i:1, j})
		}*/
		console.log("nextPossibleCells")
		console.log(nextPossibleCells)
		return nextPossibleCells
	}

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
				//console.log("current cell")
				break
			}
			if(previousCell.i == possible.i + 1 && previousCell.j == possible.j )
			{//is there yet in the path a cell on top of the possible cell
				console.log("adjacent top")
				return true
			}

			if(previousCell.i == possible.i - 1 && previousCell.j == possible.j )
			{//is there yet in the path a cell at the bottom of the possible cell
				console.log("adjacent bottol")
				return true
			}

			if(previousCell.i == possible.i  && previousCell.j == possible.j - 1 )
			{//is there yet in the path a cell on the left of the possible cell
				console.log("adjacent left")
				return true
			}

			if(previousCell.i == possible.i  && previousCell.j == possible.j + 1 )
			{//is there yet in the path a cell on the right of the possible cell
				console.log("adjacent right")
				return true
			}
		}
		return isProblematicCell
	}

}

export default new GameLogic()