import { connect } from 'react-redux'
import { try_cell, change_level, game_start } from '../actions/gameActions'
import Grid from '../components/grid'


export default function(gameLogic){
 
  

  /**
  * mapping from redux state to react props for connected component
  */
  const mapStateToProps = (state, ownProps) => {
    return state.game
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
      test_thunk:()=>{
        dispatch(test_thunk(gameLogic))
      },
      change_level:()=>{
        dispatch(change_level())
      },
      game_start:()=>{
        dispatch(game_start())
      }
    }
  }

  

  /**
  * Connection GameContainer to Grid
  */
  const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Grid)
  return GameContainer
}