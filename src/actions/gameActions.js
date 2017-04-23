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

export function show_menu(menu)
{
	return {
		type: 'SHOW_MENU',
		payload : menu
	}
}

export function back_to_game()
{
	return {
		type: 'BACK_TO_GAME'
	}
}

export function mouse_down()
{
	return {
		type: 'MOUSE_DOWN'
	}
}


export function mouse_up()
{
	return {
		type: 'MOUSE_UP'
	}
}

export function enter_player_name(name)
{
	return {
		type: 'ENTER_PLAYER_NAME',
		name: name
	}
}


export function fetch_scores(scores)
{
	return {
		type: 'FETCH_SCORES',
		scores
	}
}

export function add_rank(rank)
{
	return {
		type: 'ADD_RANK',
		rank
	}
}


export function game_over()
{
	return {
		type: 'GAME_OVER'
	}
}