import { connect } from 'react-redux'
import { try_cell, change_level, game_start, show_menu, back_to_game, mouse_down, mouse_up, enter_player_name, fetch_scores, add_score } from '../actions/gameActions'
import Main from '../components/main'

  /**
  * mapping from redux state to react props for connected component
  */
  const mapStateToProps = (state, ownProps) => {
    return state
  }
  /**
  * mapping of dispatched redux actions to react connected component
  */
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      try_cell: (i, j) => {
        dispatch(try_cell(i, j))
      },
      change_level:()=>{
        dispatch(change_level())
      },
      game_start:()=>{
        dispatch(game_start())
      },
      show_menu:(menu)=>{
        dispatch(show_menu(menu))
      },
      back_to_game:()=>{
        dispatch(back_to_game())
      },
      mouse_down:()=>{
        dispatch(mouse_down())
      },
      mouse_up:()=>{
        dispatch(mouse_up())
      },
      enter_player_name:(name)=>{
        dispatch(enter_player_name(name))
      }
    }
  }

  

  /**
  * Connection GameContainer to Grid
  */
  const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)


export default  GameContainer