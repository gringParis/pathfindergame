import { connect } from 'react-redux'
import { try_cell, change_level, game_start, show_scores, back_to_game, mouse_down, mouse_up } from '../actions/gameActions'
import Main from '../components/main'


export default function(gameLogic){
 
  

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
        console.log(ownProps)
        dispatch(try_cell(i, j))
      },
      change_level:()=>{
        dispatch(change_level())
      },
      game_start:()=>{
        dispatch(game_start())
      },
      show_scores:()=>{
        dispatch(show_scores())
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
      
    }
  }

  

  /**
  * Connection GameContainer to Grid
  */
  const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
  return GameContainer
}