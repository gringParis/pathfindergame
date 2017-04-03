/**
*	when the player click on a cell
*/
export function try_cell(i, j) {

  return {
    type: 'TRY_CELL',
    i,
    j
  }
}

/**
*	when a new level has to be dispalyed
*/
export function change_level() {
  return {
    type: 'CHANGE_LEVEL'
  }
}

export function end_hintmode(){
	return {
		type: 'END_HINTMODE'
	}
}


export function game_start(){
	return {
		type: 'GAME_START'
	}
}

export function game_restart(){
	return {
		type: 'GAME_RESTART'
	}
}